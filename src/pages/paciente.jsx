import { useState ,useEffect} from 'react';

import { Helmet } from 'react-helmet-async';
import { PacienteService } from 'src/service/paciente';
import { PacienteView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function PacientePage() {
    const [pacientes, setPacientes] = useState([{}]);
    useEffect(() => {
      fetchData();
    }, []);

 const fetchData = async () => {
    const pacientesAPI = await PacienteService.getAll();
    
    setPacientes(pacientesAPI);
  };

  useEffect(() => {
    console.log('plannerData',pacientes)
  }, [pacientes]);
  return (
    <>
      <Helmet>
        <title> Paciente | Minimal UI </title>
      </Helmet>

      <PacienteView pacientes = {pacientes} />
    </>
  );
}
