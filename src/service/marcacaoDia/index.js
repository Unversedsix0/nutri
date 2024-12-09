const getMarcacaoDia = async () => {
    const { data, error } = await api.rpc('get_marcacao_dia');
  
    if (error) {
      console.error('Erro ao chamar a procedure:', error.message);
      return null;
    }
  
    console.log('Resultado da procedure:', data);
    return data;
  };
