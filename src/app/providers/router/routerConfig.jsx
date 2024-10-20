import { AdminPage } from 'pages/AdminPage';
import { ChecksPage } from '../../../pages/ChecksPage';
import { LoginPage } from '../../../pages/LoginPage/LoginPage';
import { PrivateRoute } from './PrivateRoute';

const MAIN = '/';
const ADMIN_PAGE = '/admin';
const CHECKS_PAGE = '/checks';
const LOGIN_PAGE = '/login';

export const routeConfig = {
  [MAIN]: {
    path: MAIN,
    element: (<PrivateRoute><ChecksPage /></PrivateRoute>),
  },
  [ADMIN_PAGE]: {
    path: ADMIN_PAGE,
    element: (<PrivateRoute><AdminPage /></PrivateRoute>),
  },
  [CHECKS_PAGE]: {
    path: CHECKS_PAGE,
    element: (<PrivateRoute><ChecksPage /></PrivateRoute>),
  },
  [LOGIN_PAGE]: {
    path: LOGIN_PAGE,
    element: (<LoginPage />),
  },
};
