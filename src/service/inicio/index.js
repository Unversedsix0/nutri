import { api } from '../api';

const getAguardandoDia = async () => {
  const { data, error } = await api.rpc('get_aguardando_dia');

  if (error) {
    console.error('Erro ao chamar a procedure:', error.message);
    return null;
  }

  console.log('Resultado da procedure:', data);
  return data;
};


const getConfirmadosDia = async () => {
  const { data, error } = await api.rpc('get_confirmados_dia');

  if (error) {
    console.error('Erro ao chamar a procedure:', error.message);
    return null;
  }

  console.log('Resultado da procedure:', data);
  return data;
};


const getMarcacaoDia = async () => {
  const { data, error } = await api.rpc('get_marcacao_dia');

  if (error) {
    console.error('Erro ao chamar a procedure:', error.message);
    return null;
  }

  console.log('Resultado da procedure:', data);
  return data;
};


const getPacientesDia = async () => {
  const { data, error } = await api.rpc('get_pacientes_dia');

  if (error) {
    console.error('Erro ao chamar a procedure:', error.message);
    return null;
  }

  console.log('Resultado da procedure:', data);
  return data;
};


export const InicioService = {
  getAguardandoDia,
  getConfirmadosDia,
  getMarcacaoDia,
  getPacientesDia
};
