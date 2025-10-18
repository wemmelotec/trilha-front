import React, { useEffect, useState } from 'react';
import { getClientes, deleteCliente } from '../services/clienteService';
import CustomTable from '../components/table';
import CustomButton from '../components/button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchClientes = async () => {
      const response = await getClientes();
      setClientes(response);
    };
    fetchClientes();
  }, []);


  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Você tem certeza que deseja deletar?',
      text: 'Este cliente será excluído definitivamente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
    });


    if (result.isConfirmed) {
      await deleteCliente(id);
      setClientes(clientes.filter(cliente => cliente.id !== id));
      Swal.fire('Excluído!', 'O cliente foi excluído.', 'success');
    }
  };


  const columns = ['nome', 'cpf', 'email', 'ativo'];

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <CustomButton onClick={() => navigate('/clientes/cadastro')}>Cadastrar Cliente</CustomButton>
      <CustomTable
        columns={columns}
        data={clientes}
        onEdit={(id) => navigate(`/clientes/editar/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};


export default ClienteList;