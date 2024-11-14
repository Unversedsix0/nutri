import { Helmet } from 'react-helmet-async';
import AgendaView from 'src/sections/agenda/agenda-view';

// ----------------------------------------------------------------------

export default function AgendaPage() {
  return (
    <>
      <Helmet>
        <title> Agenda | EatWise </title>
      </Helmet>
      <AgendaView/>
    </>
  );
}