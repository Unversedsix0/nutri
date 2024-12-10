import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { InicioService } from 'src/service/inicio';

import { api } from 'src/service/api';


import BannerHome from 'src/components/banner-home/banner-home';


// import AppTasks from '../app-tasks';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [confirmadosDia, setConfirmadosDia] = useState(0);
  const [aguardandoDia, setAguardandoDia] = useState(0);
  const [marcacaoDia, setMarcacaoDia] = useState(0);
  const [pacientesDia, setPacientesDia] = useState(0);

  // console.log("confirmados", confirmadosDia);
  // console.log("aguardando", aguardandoDia);
  // console.log("marcacao", marcacaoDia);
  // console.log("pacientes", pacientesDia);
  useEffect(() => {
    fetchData();
  }, []);

const fetchData = async () => {
  const getAguardandoDiaAPI = await InicioService.getAguardandoDia();

  setAguardandoDia(getAguardandoDiaAPI);
  
  const getConfirmadosDiaAPI = await InicioService.getConfirmadosDia();

  setConfirmadosDia(getConfirmadosDiaAPI);
  
  const getMarcacaoDiaAPI = await InicioService.getMarcacaoDia();

  setMarcacaoDia(getMarcacaoDiaAPI);

  const getPacientesDiaAPI = await InicioService.getPacientesDia();

  setPacientesDia(getPacientesDiaAPI);

};

  return (
    <Container maxWidth="xl">
      <BannerHome/>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Confirmados do Dia"
            total={confirmadosDia}
            color="success"
           
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Novos Pacientes do Dia"
            total={pacientesDia}
            color="info"
            
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Marcações do Dia"
            total={marcacaoDia}
            color="warning"
           
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Aguardando do Dia"
            total={aguardandoDia}
            color="error"
            
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
