import api from "./api";

// Função para buscar todos os clientes
export const getClientes = async () => {
  try {
    const response = await api.get("/clientes");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    throw error;
  }
};

// Função para criar um cliente
export const createCliente = async (cliente) => {
  try {
    const response = await api.post("/clientes/", cliente);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    throw error;
  }
};

// Função para atualizar um cliente
export const updateCliente = async (id, clienteAtualizado) => {
  try {
    const response = await api.put(`/clientes/${id}/`, clienteAtualizado);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    throw error;
  }
};

// Função para deletar um cliente
export const deleteCliente = async (id) => {
  try {
    await api.delete(`/clientes/${id}`);
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    throw error;
  }
};
