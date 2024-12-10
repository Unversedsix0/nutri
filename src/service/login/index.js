import { api } from '../api';

const ROTA = 'usuario_consultorio';

const getAll = async () => {
  const { data } = await api.from(ROTA).select('*');

  return data;
};
async function register(json_obj) {
  const { data, error } = await api.rpc('registro_consultorio', { json_obj });

  if (error) {
    console.error('Erro ao chamar a procedure:', error.message);
    return null;
  }


  return data;
}

async function signin(email,senha){
const { data } = await api.from(ROTA).select('*').eq('email', email).eq('senha', senha);
if (data?.length) {
      if (data[0].email === email && data[0].senha === senha) {
        const token = Math.random().toString(36).substring(2);
        const id_consultorio = data[0].id_consultorio;
        localStorage.setItem('user_token', JSON.stringify({ id_consultorio, email, token }));
        return data;
      } 
       
    } 
     return 'E-mail ou senha incorretos';
   
    
  };




export const LoginService = {
  register,
  signin,
  getAll
};
