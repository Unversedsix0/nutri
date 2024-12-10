/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext,  useState } from 'react';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLogado, setIsLogado] = useState(false);



  return (
    <AuthContext.Provider value={{isLogado, setIsLogado}}>
      {children}
    </AuthContext.Provider>
  );
};
