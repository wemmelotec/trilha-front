import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../shared/services/cliente/clienteService';
import { ClienteModel } from '../../../shared/models/clienteModel';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-cadastro-cliente',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    Navbar
  ],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.scss'
})
export class CadastroCliente implements OnInit {

  editar: boolean = false;
  clienteId: number | null = null;
  formGroup: FormGroup;

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) {
    this.formGroup = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      observacoes: new FormControl('', Validators.required),
      ativo: new FormControl(true)
    });

    console.log('CadastroCliente constructor executado'); // Debug
  }

  ngOnInit(): void {
    // Verifica se há um ID na rota para modo de edição
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.editar = true;
      this.clienteId = +id; // Converte para número
      this.carregarCliente(this.clienteId);
    }
  }

  private carregarCliente(id: number): void {
    this.clienteService.getClienteById(id).subscribe({
      next: (cliente: ClienteModel) => {
        console.log('Cliente carregado:', cliente); // Debug
        this.formGroup.patchValue({
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf,
          email: cliente.email,
          senha: cliente.senha,
          observacoes: cliente.observacoes,
          ativo: cliente.ativo
        });
      },
      error: (error) => {
        console.error('Erro ao carregar cliente:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar os dados do cliente.',
        });
        this.router.navigate(['/cliente']);
      }
    });
  }

  cadastrar() {
    // Validação do formulário
    if (!this.formGroup.valid) {
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Por favor, preencha todos os campos obrigatórios!',
      });
      return;
    }

    const cliente: ClienteModel = this.formGroup.value;

    if (this.editar) {
      // Modo de edição
      this.clienteService.updateCliente(cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cliente atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/cliente']);
        },
        error: (error) => {
          console.error('Erro ao atualizar cliente:', error);

          let errorMessage = 'Erro ao atualizar cliente!';

          if (error.status === 404) {
            errorMessage = 'Cliente não encontrado!';
          } else if (error.status === 400) {
            errorMessage = 'Dados inválidos! Verifique os campos preenchidos.';
          } else if (error.status === 500) {
            errorMessage = 'Erro interno do servidor.';
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
    } else {
      // Modo de criação
      console.log('=== INÍCIO DEBUG CRIAR CLIENTE ===');
      console.log('Dados do formulário:', cliente);
      console.log('Dados completos que serão enviados:', JSON.stringify(cliente, null, 2));

      this.clienteService.createCliente(cliente).subscribe({
        next: () => {
          console.log('✅ Cliente criado com sucesso');
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cliente cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/cliente']);
        },
        error: (error) => {
          console.error('❌ ERRO COMPLETO ao criar cliente:');
          console.error('Error object:', error);
          console.error('Error status:', error.status);
          console.error('Error statusText:', error.statusText);
          console.error('Error error:', error.error);

          let errorMessage = 'Erro ao cadastrar cliente!';

          if (error.status === 400) {
            // Trata erros de validação específicos
            if (error.error) {
              console.error('Detalhes dos erros de validação:', error.error);

              // Verifica erros específicos por campo
              if (error.error.senha) {
                errorMessage = Array.isArray(error.error.senha)
                  ? `Erro na senha: ${error.error.senha.join(', ')}`
                  : `Erro na senha: ${error.error.senha}`;
              } else if (error.error.cpf) {
                errorMessage = Array.isArray(error.error.cpf)
                  ? `Erro no CPF: ${error.error.cpf.join(', ')}`
                  : `Erro no CPF: ${error.error.cpf}`;
              } else if (error.error.email) {
                errorMessage = Array.isArray(error.error.email)
                  ? `Erro no email: ${error.error.email.join(', ')}`
                  : `Erro no email: ${error.error.email}`;
              } else if (error.error.message) {
                errorMessage = error.error.message;
              } else {
                // Lista todos os erros
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
            errorMessage = 'Cliente já cadastrado! CPF ou email já existente.';
          } else if (error.status === 500) {
            errorMessage = 'Erro interno do servidor.';
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }

          console.error('Mensagem final do erro:', errorMessage);
          console.log('=== FIM DEBUG CRIAR CLIENTE ===');

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
          });
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/cliente']);
  }

}



