import { AdminPage } from 'pages/AdminPage';
import { ChecksPage } from 'pages/ChecksPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';


export const AppRoutes = {
  MAIN: '/',
  ADMIN_PAGE: '/admin',
  CHECKS_PAGE: '/checks',
  LOGIN_PAGE: '/login',
}

const { MAIN, ADMIN_PAGE, CHECKS_PAGE, LOGIN_PAGE } = AppRoutes;

export const routeConfig = {
  [MAIN]: {
    path: MAIN,
    element: (<ChecksPage />),
  },
  [ADMIN_PAGE]: {
    path: ADMIN_PAGE,
    element: (<AdminPage />),
  },
  [CHECKS_PAGE]: {
    path: CHECKS_PAGE,
    element: (<ChecksPage />),
  },
  [LOGIN_PAGE]: {
    path: LOGIN_PAGE,
    element: (<LoginPage />),
  },
};
