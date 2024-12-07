import { api } from '../api';




async function register(json_obj) {
  const { data, error } = await api.rpc('registro_consultorio', { json_obj });

  if (error) {
    console.error('Erro ao chamar a procedure:', error.message);
    return null;
  }

  console.log('Resultado da procedure:', data);
  return data;
}


export const LoginService = {
  register,
};
