import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/input";
import CustomButton from "../components/button";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCliente,
  getClientes,
  updateCliente,
} from "../services/clienteService";

const ClienteForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        const response = await getClientes();
        const cliente = response.find((c) => c.id === Number(id));
        setValue("nome", cliente.nome);
        setValue("cpf", cliente.cpf);
        setValue("email", cliente.email);
        setValue("observacoes", cliente.observacoes);
      };
      fetchCliente();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateCliente(id, data);
        Swal.fire("Sucesso!", "Cliente atualizado com sucesso!", "success");
      } else {
        await createCliente(data);
        Swal.fire("Sucesso!", "Cliente cadastrado com sucesso!", "success");
      }
      navigate("/clientes");
    } catch (error) {
      Swal.fire("Erro!", "Ocorreu um erro ao salvar os dados.", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro clientes</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nome" {...register("nome", { required: true })} />
        <Input
          label="CPF"
          mask="999.999.999-99"
          {...register("cpf", { required: true })}
        />
        <Input label="Email" {...register("email", { required: true })} />
        <Input label="Observações" {...register("observacoes")} />
        <CustomButton variant="outlined" type="submit">
          Salvar
        </CustomButton>
      </form>
    </div>
  );
};

export default ClienteForm;
