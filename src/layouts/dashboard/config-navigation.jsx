import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Inicio',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Pacientes',
    path: '/paciente',
    icon: icon('ic_user'),
  },
  {
    title: 'Agenda',
    path: '/agenda',
    icon: icon('agenda'),
  },
  {
    title: 'Relatórios',
    path: '/relatorio',
    icon: icon('relatorio'),
  },
];

export default navConfig;
