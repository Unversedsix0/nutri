import { Helmet } from 'react-helmet-async';

import { FinanView } from 'src/sections/financeiro/view';

// ----------------------------------------------------------------------

export default function FinanPage() {
  return (
    <>
      <Helmet>
        <title> Blog | EatWise </title>
      </Helmet>

      <FinanView />
    </>
  );
}
