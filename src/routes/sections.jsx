import { Children, lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const FinanPage = lazy(() => import('src/pages/financeiro'));
export const PacientePage = lazy(() => import('src/pages/paciente'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AgendaPage = lazy(() => import('src/pages/agenda'));
export const RelatorioPage = lazy(() => import('src/pages/relatorio'));
export const RegisterPage = lazy(() => import('src/pages/register'));

// ----------------------------------------------------------------------
const Private = ()=> {
   const { isLogado } = useAuth()

  return isLogado > 0? (<DashboardLayout>
                    <Suspense>
                     <Outlet />
                    </Suspense>
                  </DashboardLayout>) : <LoginPage />  
}
export default function Router() {
  const routes = useRoutes([
    {
      element:( <Private/>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'paciente', element: <PacientePage /> },
        { path: 'financeiro', element: <FinanPage /> },
        { path: 'agenda', element: <AgendaPage /> },
        { path: 'relatorio', element: <RelatorioPage /> },
        
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
  ]);

  return routes;
}
