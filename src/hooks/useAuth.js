import { useContext } from 'react';
import { AuthContext } from 'src/context/auth';



const useAuth = () => {
  const context =useContext(AuthContext)

  return context;
};

export default useAuth;
