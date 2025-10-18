import React, { useState, useEffect } from "react";
import { createCliente, updateCliente } from "../services/clienteService";

const FormCliente = ({ clienteAtual, onSave }) => {
  const [cliente, setCliente] = useState({
    nome: "",
    cpf: "",
    email: "",
    observacoes: "",
    ativo: true,
  });

  useEffect(() => {
    if (clienteAtual) {
      setCliente(clienteAtual);
    }
  }, [clienteAtual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cliente.id) {
        await updateCliente(cliente.id, cliente);
      } else {
        await createCliente(cliente);
      }
      onSave();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
        />
      </label>
      <label>
        CPF:
        <input
          type="text"
          name="cpf"
          value={cliente.cpf}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Observações:
        <textarea
          name="observacoes"
          value={cliente.observacoes}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Ativo:
        <input
          type="checkbox"
          name="ativo"
          checked={cliente.ativo}
          onChange={() => setCliente({ ...cliente, ativo: !cliente.ativo })}
        />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default FormCliente;
