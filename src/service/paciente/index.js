import { api } from '../api';

const ROTA = 'Paciente';

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
const insertData = async (paciente) => {
  const { data } = await api.from(ROTA).insert([
    {
      id_consultorio: paciente.id_consultorio,
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
      id_sexo: paciente.id_sexo
    },
  ]);
  console.log('insertData - data', data);
};

export const PacienteService = {
  getAll,
  getByID,
  getByNome,
  getByCPF,
  insertData
};
