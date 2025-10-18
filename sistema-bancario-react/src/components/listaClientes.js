import React, { useEffect, useState } from "react";
import { getClientes, deleteCliente } from "../services/clienteService";

const ListaClientes = ({ onEdit }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };
  return (
    <div>
      <h2>Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => onEdit(cliente)}>Editar</button>
                <button onClick={() => handleDelete(cliente.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaClientes;
