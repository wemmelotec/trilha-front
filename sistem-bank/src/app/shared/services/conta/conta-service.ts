import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ContaModel } from '../../models/contaModel';
import { Observable } from 'rxjs';
import { DepositoModel } from '../../models/depositoModel';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private apiUrl = `${environment.api}/contas/`;

  constructor(private http: HttpClient) { }

  getContas(): Observable<ContaModel[]> {
    return this.http.get<ContaModel[]>(this.apiUrl);
  }

  getContaById(id: number): Observable<ContaModel> {
    console.log(`Buscando conta com ID: ${id}`); // Debug
    return this.http.get<ContaModel>(`${this.apiUrl}${id}/`);
  }

  createConta(conta: ContaModel): Observable<ContaModel> {
    return this.http.post<ContaModel>(this.apiUrl, conta);
  }

  updateConta(conta: ContaModel): Observable<ContaModel> {
    console.log(`Atualizando conta com ID: ${conta.id}`); // Debug
    return this.http.put<ContaModel>(`${this.apiUrl}${conta.id}/`, conta);
  }

  deleteConta(id: number): Observable<object> {
    console.log(`Deletando conta com ID: ${id}`); // Debug
    return this.http.delete<object>(`${this.apiUrl}${id}/`);
  }

  getContasPaginated(page: number, size: number): Observable<ContaModel[]> {
    return this.http.get<ContaModel[]>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  realizarDeposito(deposito: DepositoModel): Observable<ContaModel> {
    console.log(`Realizando depósito:`, deposito);

    // Busca a conta atual e atualiza o saldo
    return new Observable((observer) => {
      this.getContaById(deposito.conta).subscribe({
        next: (conta) => {
          // Calcula novo saldo
          const saldoAtual = parseFloat(conta.saldo);
          const valorDeposito = parseFloat(deposito.valor);
          const novoSaldo = (saldoAtual + valorDeposito).toFixed(2);

          // Atualiza a conta com o novo saldo
          const contaAtualizada: ContaModel = {
            ...conta,
            saldo: novoSaldo
          };

          console.log(`Atualizando saldo de ${conta.saldo} para ${novoSaldo}`);

          // Faz o PUT para atualizar
          this.updateConta(contaAtualizada).subscribe({
            next: (contaResponse) => {
              observer.next(contaResponse);
              observer.complete();
            },
            error: (error) => {
              observer.error(error);
            }
          });
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

}
