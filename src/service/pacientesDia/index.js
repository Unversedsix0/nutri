const getPacientesDia = async () => {
    const { data, error } = await api.rpc('get_pacientes_dia');
  
    if (error) {
      console.error('Erro ao chamar a procedure:', error.message);
      return null;
    }
  
    console.log('Resultado da procedure:', data);
    return data;
  };
