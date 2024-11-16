import { Helmet } from 'react-helmet-async';

import { FinanView } from 'src/sections/financeiro/view';

// ----------------------------------------------------------------------

export default function FinanPage() {
  return (
    <>
      <Helmet>
        <title> Financeiro | EatWise </title>
      </Helmet>

      <FinanView />
    </>
  );
}
