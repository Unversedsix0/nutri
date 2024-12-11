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
  const { data, error } = await api.rpc('get_endereco_paciente ', { id_paciente });

  if (error) {
    console.error('Erro ao chamar a procedure:', error.message);
    return null;
  }

  console.log('Resultado da procedure:', data);
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

const insertData = async (endereco) => {
  const { data } = await api.from(ROTA).insert([
    {
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      cidade: endereco.cidade,
      uf: endereco.uf,
      complemento: endereco.complemento
    },
  ]);
  console.log('insertData - data', data);
};


export const EnderecoService = {
  getAll,
  getByID,
  getByIDPaciente,
  getByCEP,
  getByRua,
  insertData
};
