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
import { ContaService } from '../../../shared/services/conta/conta-service';
import { ContaModel } from '../../../shared/models/contaModel';
import { ClienteService } from '../../../shared/services/cliente/clienteService';
import { ClienteModel } from '../../../shared/models/clienteModel';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { forkJoin } from 'rxjs';

// Tipo para conta com informações do cliente
type ContaComClienteInfo = ContaModel & {
  clienteInfo: ClienteModel;
};

@Component({
  selector: 'app-listagem-conta',
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
  templateUrl: './listagem-conta.html',
  styleUrl: './listagem-conta.scss'
})
export class ListagemConta implements AfterViewInit {

  private contaService = inject(ContaService);
  private clienteService = inject(ClienteService);

  // colunas exibidas na tabela
  displayedColumns: string[] = ['id', 'numero', 'agencia', 'cliente', 'saldo', 'funcoes'];

  // datasource do Material
  dataSource = new MatTableDataSource<ContaComClienteInfo>([]);

  // dados paginados para exibição
  dadosPaginados: ContaComClienteInfo[] = [];

  // configuração da paginação
  pageSize = 5;
  pageIndex = 0;
  totalContas = 0;

  loading = signal(false);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.listarContas();
  }

  listarContas(): void {
    this.loading.set(true);

    // Carrega contas e clientes em paralelo
    forkJoin({
      contas: this.contaService.getContas(),
      clientes: this.clienteService.getClientes()
    }).subscribe({
      next: ({ contas, clientes }) => {
        // Cria um mapa de clientes para busca rápida
        const clienteMap = new Map<number, ClienteModel>();
        clientes.forEach(cliente => clienteMap.set(cliente.id!, cliente));

        // Combina dados de conta com dados do cliente
        const contasComCliente: ContaComClienteInfo[] = contas.map(conta => ({
          ...conta,
          clienteInfo: clienteMap.get(conta.cliente) || {
            id: conta.cliente,
            nome: 'Cliente não encontrado',
            cpf: '',
            email: '',
            senha: '',
            observacoes: '',
            ativo: false
          } as ClienteModel
        }));

        console.log('Contas com clientes carregadas:', contasComCliente);

        // Armazena todos os dados
        this.dataSource.data = contasComCliente;
        this.totalContas = contasComCliente.length;

        // Calcula e aplica a paginação
        this.aplicarPaginacao();

        // Conecta o paginator
        if (this.paginator) {
          this.paginator.length = this.totalContas;
          this.paginator.pageSize = this.pageSize;
          this.paginator.pageIndex = this.pageIndex;
        }

        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar contas:', err);
        this.loading.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não foi possível carregar a lista de contas.',
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

  deletarConta(id: number): void {
    Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      text: 'Não tem como reverter essa ação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Tentando deletar conta com ID: ${id}`);

        this.contaService.deleteConta(id).subscribe({
          next: (response) => {
            console.log('Conta deletada com sucesso:', response);
            Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Conta deletada com sucesso!',
              showConfirmButton: false,
              timer: 1500,
            });
            // Recarrega a lista de contas
            this.listarContas();
          },
          error: (error) => {
            console.error('Erro ao deletar conta:', error);

            let errorMessage = 'Erro ao deletar conta!';

            // Verifica o tipo de erro para dar uma mensagem mais específica
            if (error.status === 404) {
              errorMessage = 'Conta não encontrada!';
            } else if (error.status === 403) {
              errorMessage = 'Você não tem permissão para deletar esta conta!';
            } else if (error.status === 409) {
              errorMessage = 'Conta não pode ser deletada pois possui transações!';
            } else if (error.error && error.error.message) {
              errorMessage = error.error.message;
            }

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: errorMessage,
            });
          },
        });
      }
    });
  }

  // Formatar saldo para exibição
  formatarSaldo(saldo: string): string {
    const valor = parseFloat(saldo);
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  // Verificar se saldo é positivo
  isSaldoPositivo(saldo: string): boolean {
    return parseFloat(saldo) >= 0;
  }

  // opcional: performance ao renderizar linhas
  trackById = (_: number, item: ContaComClienteInfo) => item.id;
}
