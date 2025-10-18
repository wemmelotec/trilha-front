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
    const cliente: ClienteModel = this.formGroup.value;

    if (this.editar) {
      this.clienteService.updateCliente(cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cliente atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/cliente']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao atualizar cliente!',
          });
        }
      });
    } else {
      // Modo de criação
      this.clienteService.createCliente(cliente).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sucesso',
            text: 'Cliente cadastrado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/cliente']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Erro ao cadastrar cliente!',
          });
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/cliente']);
  }

}



