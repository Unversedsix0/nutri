import { Helmet } from 'react-helmet-async';
import Home from 'src/components/relatorio';

// ----------------------------------------------------------------------

export default function RelatorioPage() {
  return (
    <>
      <Helmet>
        <title> Relatórios | EatWise </title>
      </Helmet>
      <Home/>
    </>
  );
}