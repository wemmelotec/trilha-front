import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContaService } from '../../../shared/services/conta/conta-service';
import { ContaModel } from '../../../shared/models/contaModel';
import { ClienteService } from '../../../shared/services/cliente/clienteService';
import { ClienteModel } from '../../../shared/models/clienteModel';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-cadastro-conta',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    Navbar
  ],
  templateUrl: './cadastro-conta.html',
  styleUrl: './cadastro-conta.scss'
})
export class CadastroConta implements OnInit {

  editar: boolean = false;
  contaId: number | null = null;
  formGroup: FormGroup;
  clientes: ClienteModel[] = [];

  constructor(
    private contaService: ContaService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      numero: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[0-9]+$/) // Apenas números
      ]),
      agencia: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern(/^[0-9]+$/) // Apenas números
      ]),
      saldo: new FormControl('0.00', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
      cliente: new FormControl('', Validators.required)
    });

    console.log('CadastroConta constructor executado'); // Debug
  }

  ngOnInit(): void {
    // Carrega a lista de clientes para o select
    this.carregarClientes();

    // Verifica se há um ID na rota para modo de edição
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.editar = true;
      this.contaId = +id; // Converte para número
      this.carregarConta(this.contaId);
    }
  }

  private carregarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes: ClienteModel[]) => {
        this.clientes = clientes.filter(cliente => cliente.ativo); // Apenas clientes ativos
        console.log('Clientes carregados:', this.clientes);
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar a lista de clientes.',
        });
      }
    });
  }

  private carregarConta(id: number): void {
    this.contaService.getContaById(id).subscribe({
      next: (conta: ContaModel) => {
        console.log('Conta carregada:', conta);
        this.formGroup.patchValue({
          id: conta.id,
          numero: conta.numero,
          agencia: conta.agencia,
          saldo: conta.saldo,
          cliente: conta.cliente
        });
      },
      error: (error) => {
        console.error('Erro ao carregar conta:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar os dados da conta.',
        });
        this.router.navigate(['/conta']);
      }
    });
  }

  cadastrar() {
    if (!this.formGroup.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, preencha todos os campos obrigatórios!',
      });
      return;
    }

    const conta: ContaModel = this.formGroup.value;

    if (this.editar) {
      this.editarConta(conta);
    } else {
      this.criarConta(conta);
    }
  }

  private editarConta(conta: ContaModel): void {
    console.log('=== INÍCIO DEBUG EDITAR CONTA ===');
    console.log('Atualizando conta:', conta);
    console.log('ID da conta:', conta.id);
    console.log('Conta ID da rota:', this.contaId);

    // Validação adicional para garantir que o ID está presente
    if (!conta.id && this.contaId) {
      conta.id = this.contaId;
      console.log('ID corrigido para:', conta.id);
    }

    if (!conta.id) {
      console.error('ERRO: ID da conta está vazio ou undefined');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'ID da conta não encontrado. Não é possível atualizar.',
      });
      return;
    }

    console.log('Dados completos que serão enviados:', JSON.stringify(conta, null, 2));

    this.contaService.updateConta(conta).subscribe({
      next: (response) => {
        console.log('✅ Conta atualizada com sucesso:', response);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Conta atualizada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/conta']);
      },
      error: (error) => {
        console.error('❌ ERRO ao atualizar conta:', error);

        let errorMessage = 'Erro ao atualizar conta!';

        if (error.status === 0) {
          errorMessage = 'Erro de conexão! Verifique se a API está funcionando.';
        } else if (error.status === 404) {
          errorMessage = `Conta com ID ${conta.id} não encontrada na API!`;
        } else if (error.status === 400) {
          errorMessage = 'Dados inválidos! Verifique os campos preenchidos.';
        } else if (error.status === 500) {
          errorMessage = 'Erro interno do servidor. Contate o administrador.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      }
    });
  }

  private criarConta(conta: ContaModel): void {
    console.log('=== INÍCIO DEBUG CRIAR CONTA ===');
    console.log('Criando conta:', conta);
    console.log('Dados completos que serão enviados:', JSON.stringify(conta, null, 2));

    this.contaService.createConta(conta).subscribe({
      next: (response) => {
        console.log('✅ Conta criada com sucesso:', response);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Conta cadastrada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/conta']);
      },
      error: (error) => {
        console.error('❌ ERRO COMPLETO ao criar conta:');
        console.error('Error object:', error);
        console.error('Error status:', error.status);
        console.error('Error statusText:', error.statusText);
        console.error('Error error:', error.error);

        let errorMessage = 'Erro ao cadastrar conta!';

        if (error.status === 400) {
          // Verifica se há erros específicos de validação
          if (error.error) {
            console.error('Detalhes dos erros de validação:', error.error);

            // Verifica erros específicos por campo
            if (error.error.numero) {
              if (Array.isArray(error.error.numero)) {
                errorMessage = `Erro no número da conta: ${error.error.numero.join(', ')}`;
              } else {
                errorMessage = `Erro no número da conta: ${error.error.numero}`;
              }
            } else if (error.error.agencia) {
              if (Array.isArray(error.error.agencia)) {
                errorMessage = `Erro na agência: ${error.error.agencia.join(', ')}`;
              } else {
                errorMessage = `Erro na agência: ${error.error.agencia}`;
              }
            } else if (error.error.saldo) {
              if (Array.isArray(error.error.saldo)) {
                errorMessage = `Erro no saldo: ${error.error.saldo.join(', ')}`;
              } else {
                errorMessage = `Erro no saldo: ${error.error.saldo}`;
              }
            } else if (error.error.cliente) {
              if (Array.isArray(error.error.cliente)) {
                errorMessage = `Erro no cliente: ${error.error.cliente.join(', ')}`;
              } else {
                errorMessage = `Erro no cliente: ${error.error.cliente}`;
              }
            } else if (error.error.message) {
              errorMessage = error.error.message;
            } else {
              // Se há múltiplos erros, lista todos
              const erros = [];
              for (const [campo, mensagens] of Object.entries(error.error)) {
                if (Array.isArray(mensagens)) {
                  erros.push(`${campo}: ${mensagens.join(', ')}`);
                } else {
                  erros.push(`${campo}: ${mensagens}`);
                }
              }
              if (erros.length > 0) {
                errorMessage = `Erros de validação:\n${erros.join('\n')}`;
              }
            }
          } else {
            errorMessage = 'Dados inválidos! Verifique os campos preenchidos.';
          }
        } else if (error.status === 409) {
          errorMessage = 'Conta já existe! Número da conta já cadastrado.';
        } else if (error.status === 500) {
          errorMessage = 'Erro interno do servidor. Contate o administrador.';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        console.error('Mensagem final do erro:', errorMessage);
        console.log('=== FIM DEBUG CRIAR CONTA ===');

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/conta']);
  }

  navegarParaClientes(): void {
    // Abre a listagem de clientes em uma nova aba
    window.open('/cliente', '_blank');
  }
}
