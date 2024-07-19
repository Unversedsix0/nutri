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

export const PacienteService = {
  getAll,
  getByID,
  getByNome,
  getByCPF,
};
