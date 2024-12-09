const getAguardandoDia = async () => {
    const { data, error } = await api.rpc('get_aguardando_dia');
  
    if (error) {
      console.error('Erro ao chamar a procedure:', error.message);
      return null;
    }
  
    console.log('Resultado da procedure:', data);
    return data;
  };
