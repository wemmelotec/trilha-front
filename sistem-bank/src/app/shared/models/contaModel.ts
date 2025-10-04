import { ClienteModel } from './clienteModel';

export interface ContaModel {
  id: number;
  numero: string;
  agencia: string;
  saldo: string; // API retorna como string (formato decimal)
  cliente: number; // API retorna apenas o ID do cliente, não o objeto completo
}

// Interface opcional para quando precisar do objeto cliente completo
/**
export interface ContaComClienteModel {
  id: number;
  numero: string;
  agencia: string;
  saldo: string;
  cliente: ClienteModel; // objeto completo do cliente
}
**/
