import { api } from '../api';

const ROTA = 'agendamento';

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

  const { data, error } = await api.from(ROTA).insert([
    {
      id_consultorio: agendamento.id_consultorio,
      id_paciente: agendamento.id_paciente,
      data: agendamento.data,
      hora: agendamento.hora,
      descricao: agendamento.descricao,
      tarefa: agendamento.tarefa
    },
  ]);
  console.log('insertData - data', agendamento);
  console.log('insertData - error', error);
};

const deleteByID = async (idAgendamento) => {
  const { error } = await api.from(ROTA).delete().eq({
    id: idAgendamento
  });
};

const update = async(agendamento)=>{
  api
    .from(ROTA)
    .update({
      id_consultorio: agendamento.id_consultorio,
      id_paciente: agendamento.id_paciente,
      data: agendamento.data,
      hora: agendamento.hora,
      descricao: agendamento.descricao,
      tarefa: agendamento.tarefa,
    })
    .eq( {id: agendamento.id})
    .select();
}


export const AgendaService = {
  getAll,
  getByID,
  getByIDPaciente,
  getByData,
  insertData,
  deleteByID,
  update
};
