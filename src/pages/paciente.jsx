import { Helmet } from 'react-helmet-async';

import { PacienteView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function PacientePage() {
  return (
    <>
      <Helmet>
        <title> User | EatWise </title>
      </Helmet>

      <PacienteView />
    </>
  );
}
