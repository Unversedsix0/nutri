import { api } from '../api';

const ROTA = 'agendameto';

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

const getByData = async(dataConsulta) =>{
  const { data } = await api.from(ROTA).select(dataConsulta);
  return data;
}

const insertData = async (agendamento) => {
  const { data } = await api.from(ROTA).insert([
    {
      id_consultorio: agendamento.id_consultorio,
      id_paciente: agendamento.id_paciente,
      data: agendamento.data,
      hora: agendamento.hora,
      descricao: agendamento.descricao,
      tarefa: agendamento.tarefa
    },
  ]);
  console.log('insertData - data', data);
};


export const AgendaService = {
  getAll,
  getByID,
  getByIDPaciente,
  getByData,
  insertData
};
