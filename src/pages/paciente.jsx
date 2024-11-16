import { Helmet } from 'react-helmet-async';

import { PacienteView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function PacientePage() {
  return (
    <>
      <Helmet>
        <title> Paciente | EatWise </title>
      </Helmet>

      <PacienteView />
    </>
  );
}
