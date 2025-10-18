import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../../models/clienteModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = `${environment.api}/clientes/`;

  constructor(private http: HttpClient) { }

  getClientes(): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>(this.apiUrl);
  }

  getClienteById(id: number): Observable<ClienteModel> {
    console.log(`Buscando cliente com ID: ${id}`); // Debug
    return this.http.get<ClienteModel>(`${this.apiUrl}${id}/`);
  }

  createCliente(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(this.apiUrl, cliente);
  }

  updateCliente(cliente: ClienteModel): Observable<ClienteModel> {
    console.log(`Atualizando cliente com ID: ${cliente.id}`); // Debug
    return this.http.put<ClienteModel>(`${this.apiUrl}${cliente.id}/`, cliente);
  }

  deleteCliente(id: number): Observable<object> {
    console.log(`Deletando cliente com ID: ${id}`); // Debug
    return this.http.delete<object>(`${this.apiUrl}${id}/`);
  }

  getClientesPaginated(page: number, size: number): Observable<ClienteModel[]> {
    return this.http.get<ClienteModel[]>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

}
