import { Helmet } from 'react-helmet-async';

import { RegisterView } from 'src/sections/register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Registre-se | EatWise </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
