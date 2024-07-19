import { api } from '../api';

const ROTA = 'consulta';

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

export const ConsultaService = {
  getAll,
  getByID,
  getByIDPaciente
};
