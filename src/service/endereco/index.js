import { api } from '../api';

const ROTA = 'endereco';

const getAll = async () => {
  const { data } = await api.from(ROTA).select('*');
  return data;
};

const getByID = async (id) => {
  const { data } = await api.from(ROTA).select(id);

  return data;
};

const getByIDPaciente = async (id_paciente) => {
  const { data } = await api.from(ROTA).select(id_paciente);
  return data;
};

const getByCEP = async (cep) => {
  const { data } = await api.from(ROTA).select(cep);
  return data;
}

const getByRua = async (rua) => {
  const { data } = await api.from(ROTA).select('*').ilike('rua',rua);
  return data;
};


export const EnderecoService = {
  getAll,
  getByID,
  getByIDPaciente,
  getByCEP,
  getByRua
};
