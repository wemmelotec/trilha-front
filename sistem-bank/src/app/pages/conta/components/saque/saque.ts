import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import Swal from 'sweetalert2';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { ContaService } from '../../../../shared/services/conta/conta-service';
import { ClienteService } from '../../../../shared/services/cliente/clienteService';
import { ContaModel } from '../../../../shared/models/contaModel';
import { ClienteModel } from '../../../../shared/models/clienteModel';
import { SaqueModel } from '../../../../shared/models/saqueModel';
import { forkJoin } from 'rxjs';

type ContaComClienteInfo = ContaModel & {
  clienteInfo: ClienteModel;
};

@Component({
  selector: 'app-saque',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    Navbar,
  ],
  templateUrl: './saque.html',
  styleUrl: './saque.scss',
})
export class SaqueComponent implements OnInit {
  saqueForm: FormGroup;
  contas = signal<ContaComClienteInfo[]>([]);
  contaSelecionada = signal<ContaComClienteInfo | null>(null);
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private clienteService: ClienteService,
    private router: Router
  ) {
    this.saqueForm = this.fb.group({
      conta: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas(): void {
    this.loading.set(true);

    this.contaService.getContas().subscribe({
      next: (contas) => {
        const clientesRequests = contas.map((conta) =>
          this.clienteService.getClienteById(conta.cliente)
        );

        forkJoin(clientesRequests).subscribe({
          next: (clientes) => {
            const contasComInfo = contas.map((conta, index) => ({
              ...conta,
              clienteInfo: clientes[index],
            }));

            this.contas.set(contasComInfo);
            this.loading.set(false);
          },
          error: (error) => {
            console.error('❌ Erro ao carregar clientes:', error);
            this.loading.set(false);
            Swal.fire({
              icon: 'error',
              title: 'Erro!',
              text: 'Erro ao carregar informações dos clientes.',
            });
          },
        });
      },
      error: (error) => {
        console.error('❌ Erro ao carregar contas:', error);
        this.loading.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao carregar contas.',
        });
      },
    });
  }

  onContaChange(contaId: number): void {
    const conta = this.contas().find((c) => c.id === contaId);
    this.contaSelecionada.set(conta || null);
  }

  calcularNovoSaldo(): string {
    if (!this.contaSelecionada() || !this.saqueForm.get('valor')?.value) {
      return '0,00';
    }

    const saldoAtual = parseFloat(this.contaSelecionada()!.saldo);
    const valorSaque = parseFloat(this.saqueForm.get('valor')?.value);
    const novoSaldo = saldoAtual - valorSaque;

    return novoSaldo.toFixed(2).replace('.', ',');
  }

  formatarValor(valor: string): string {
    return parseFloat(valor).toFixed(2).replace('.', ',');
  }

  realizarSaque(): void {
    if (this.saqueForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção!',
        text: 'Por favor, preencha todos os campos corretamente.',
      });
      return;
    }

    const valorSaque = parseFloat(this.saqueForm.get('valor')?.value);
    const saldoAtual = parseFloat(this.contaSelecionada()!.saldo);

    if (valorSaque > saldoAtual) {
      Swal.fire({
        icon: 'error',
        title: 'Saldo Insuficiente!',
        text: 'O valor do saque é maior que o saldo disponível.',
      });
      return;
    }

    const saque: SaqueModel = {
      conta: this.saqueForm.get('conta')?.value,
      valor: this.saqueForm.get('valor')?.value,
    };

    console.log('📤 Enviando saque:', saque);

    this.loading.set(true);

    this.contaService.realizarSaque(saque).subscribe({
      next: (contaAtualizada) => {
        console.log('✅ Saque realizado com sucesso:', contaAtualizada);
        this.loading.set(false);

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: `Saque de R$ ${this.formatarValor(saque.valor)} realizado com sucesso!`,
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/conta']);
        });
      },
      error: (error) => {
        console.error('❌ Erro ao realizar saque:', error);
        console.error('Status:', error.status);
        console.error('Detalhes:', error.error);

        this.loading.set(false);

        let errorMessage = 'Erro ao realizar saque!';

        if (error.message === 'Saldo insuficiente para realizar o saque') {
          errorMessage = 'Saldo insuficiente!';
        } else if (error.status === 400) {
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
      },
    });
  }

  voltar(): void {
    this.router.navigate(['/conta']);
  }
}
