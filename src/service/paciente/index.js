import { api } from '../api';

const ROTA = 'paciente';

const getAll = async () => {
  const { data } = await api.from(ROTA).select('*');

  return data;
};
const getByID = async (id) => {
  const { data } = await api.from(ROTA).select(id);

  return data;
};
const getByNome = async (nome) => {
  const { data } = await api.from(ROTA).select('*').ilike('nome', nome);

  return data;
};
const getByCPF = async (cpf) => {
  const { data } = await api.from(ROTA).select('*').ilike('cpf', cpf);

  return data;
};
const insertData = async (json_paciente) => {
  const { data, error } = await api.rpc('registro_paciente', { json_paciente });

  if (error) {
    console.error('Erro ao chamar a procedure:', error.message);
    return null;
  }

  console.log('Resultado da procedure:', data);
  return data;
};


const deleteByID = async (idUsuario) => {

  const { error } = await api.from(ROTA).delete().eq('id', idUsuario);
  console.log('error',error)
  console.log('idUsuario', idUsuario);
};

const update = async (paciente) => {
  api
    .from(ROTA)
    .update({
      id_estado_civil: paciente.id_estado_civil,
      id_endereco: paciente.id_endereco,
      nome: paciente.nome,
      cpf: paciente.cpf,
      rg: paciente.rg,
      telefone: paciente.telefone,
      celular: paciente.celular,
      profissao: paciente.profissao,
      email: paciente.email,
      nome_mae: paciente.nome_mae,
      nome_pai: paciente.nome_pai,
      dt_nascimento: paciente.dt_nascimento,
      status: true,
      id_sexo: paciente.id_sexo,
    })
    .eq({ id: paciente.id })
    .select();
};



export const PacienteService = {
  getAll,
  getByID,
  getByNome,
  getByCPF,
  insertData,
  deleteByID,
  update
};
