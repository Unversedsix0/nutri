import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { PacienteService } from 'src/service/paciente';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';

// ----------------------------------------------------------------------

export default function AppView() {
  const [paciente, setPaciente] = useState([]);

  const fetchPaciente = async () => {
    const response = await PacienteService.getAll();
    setPaciente(response);
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchPaciente()
    // const session = api.auth.session();
    // setUser(session?.user);
    // const { data: authListener } = api.auth.onAuthStateChange((event) => {
    //   switch (event) {
    //     case "LOGADO":
    //       setUser(session.user)
    //       break;
    //     case "DESLOGADO":
    //       setUser(null)
    //       break;
    //     default:
    //   }
    // });
    // return () => {
    //   authListener.unsubscribe();
    // }
  }, [])

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi,👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>


        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
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
        </Grid>
      </Grid>
    </Container>
  );
}
