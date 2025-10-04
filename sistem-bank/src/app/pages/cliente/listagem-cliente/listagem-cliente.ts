import { Component, AfterViewInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../shared/services/cliente/clienteService';
import { ClienteModel } from '../../../shared/models/clienteModel';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-listagem-cliente',
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    Navbar,
  ],
  templateUrl: './listagem-cliente.html',
  styleUrl: './listagem-cliente.scss'
})
export class ListagemCliente implements AfterViewInit {

  private clienteService = inject(ClienteService);

  // colunas exibidas na tabela
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'status', 'funcoes'];

  // datasource do Material
  dataSource = new MatTableDataSource<ClienteModel>([]);

  // dados paginados para exibição
  dadosPaginados: ClienteModel[] = [];

  // configuração da paginação
  pageSize = 5;
  pageIndex = 0;
  totalClientes = 0;

  loading = signal(false);


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.loading.set(true);

    this.clienteService.getClientes().subscribe({
      next: (clientes: ClienteModel[]) => {
        // Armazena todos os dados
        this.dataSource.data = clientes;
        this.totalClientes = clientes.length;

        // Calcula e aplica a paginação
        this.aplicarPaginacao();

        // Conecta o paginator para a tabela desktop
        if (this.paginator) {
          this.paginator.length = this.totalClientes;
          this.paginator.pageSize = this.pageSize;
          this.paginator.pageIndex = this.pageIndex;
        }

        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar a lista de clientes.',
        });
      },
    });
  }

  aplicarPaginacao(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dadosPaginados = this.dataSource.data.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.aplicarPaginacao();
  }

  deletarCliente(id: number): void {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      text: 'Não tem como reverter essa ação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'grey',
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Sucesso',
              text: 'Cliente deletado com sucesso!',
              showConfirmButton: false,
              timer: 1500,
            });
            // Recarrega a lista de clientes
            this.listarClientes();
          },
          error: (error) => {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Erro ao deletar cliente!',
            });
          },
        });
      }
    });
  }


  // opcional: performance ao renderizar linhas
  trackById = (_: number, item: ClienteModel) => item.id;
}



