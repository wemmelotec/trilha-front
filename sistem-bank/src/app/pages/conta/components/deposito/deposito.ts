import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Services e Models
import { ContaService } from '../../../../shared/services/conta/conta-service';
import { ClienteService } from '../../../../shared/services/cliente/clienteService';
import { ContaModel } from '../../../../shared/models/contaModel';
import { ClienteModel } from '../../../../shared/models/clienteModel';
import { DepositoModel } from '../../../../shared/models/depositoModel';

// Componentes
import { Navbar } from '../../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-deposito',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Navbar
  ],
  templateUrl: './deposito.html',
  styleUrl: './deposito.scss'
})
export class Deposito implements OnInit {
  formGroup: FormGroup;
  contas: ContaModel[] = [];
  clientes: ClienteModel[] = [];
  contaSelecionada: ContaModel | null = null;

  constructor(
    private contaService: ContaService,
    private clienteService: ClienteService,
    private router: Router
  ) {
    // Inicializa o formulário
    this.formGroup = new FormGroup({
      conta: new FormControl('', Validators.required),
      valor: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/),
        Validators.min(0.01)
      ])
    });
  }

  ngOnInit(): void {
    this.carregarContas();
    this.carregarClientes();
  }

  private carregarContas(): void {
    // Busca todas as contas
    this.contaService.getContas().subscribe({
      next: (contas) => {
        this.contas = contas;
        console.log('Contas carregadas:', contas);
      },
      error: (error) => {
        console.error('Erro ao carregar contas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar a lista de contas.',
        });
      }
    });
  }

  private carregarClientes(): void {
    // Busca clientes para exibir nome no select
    this.clienteService.getClientes().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        console.log('Clientes carregados:', clientes);
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    });
  }

  onContaChange(contaId: number): void {
    // Atualiza informações quando seleciona conta
    this.contaSelecionada = this.contas.find(c => c.id === contaId) || null;
    console.log('Conta selecionada:', this.contaSelecionada);
  }

  getClienteNome(clienteId: number): string {
    const cliente = this.clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Carregando...';
  }

  realizarDeposito(): void {
    // Valida formulário
    if (!this.formGroup.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, preencha todos os campos corretamente!',
      });
      return;
    }

    const deposito: DepositoModel = this.formGroup.value;

    console.log('=== INÍCIO DEBUG DEPÓSITO ===');
    console.log('Dados do depósito:', deposito);

    this.contaService.realizarDeposito(deposito).subscribe({
      next: (contaAtualizada) => {
        console.log('✅ Depósito realizado com sucesso:', contaAtualizada);

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          html: `
            <p>Depósito realizado com sucesso!</p>
            <p><strong>Novo saldo:</strong> ${this.formatarValor(contaAtualizada.saldo)}</p>
          `,
          showConfirmButton: true,
          confirmButtonText: 'OK'
        }).then(() => {
          // Limpa formulário
          this.formGroup.reset();
          this.contaSelecionada = null;

          // Opcional: redirecionar
          // this.router.navigate(['/conta']);
        });
      },
      error: (error) => {
        console.error('❌ Erro ao realizar depósito:', error);
        console.error('Status:', error.status);
        console.error('Detalhes:', error.error);

        let errorMessage = 'Erro ao realizar depósito!';

        if (error.status === 400) {
          errorMessage = 'Dados inválidos! Verifique o valor informado.';
        } else if (error.status === 404) {
          errorMessage = 'Conta não encontrada!';
        } else if (error.status === 405) {
          errorMessage = 'Operação não permitida pela API.';
        } else if (error.status === 500) {
          errorMessage = 'Erro interno do servidor.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.error && error.error.detail) {
          errorMessage = error.error.detail;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      }
    });
  }

  formatarValor(valor: string): string {
    const valorNum = parseFloat(valor);
    return valorNum.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  calcularNovoSaldo(): string {
    if (!this.contaSelecionada || !this.formGroup.get('valor')?.value) {
      return '0';
    }
    const saldoAtual = parseFloat(this.contaSelecionada.saldo);
    const valorDeposito = parseFloat(this.formGroup.get('valor')?.value || '0');
    return (saldoAtual + valorDeposito).toString();
  }

  cancelar(): void {
    this.router.navigate(['/conta']);
  }
}
