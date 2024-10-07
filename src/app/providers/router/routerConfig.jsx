import { AdminPage } from 'pages/AdminPage';
import { MainPage } from 'pages/MainPage';

const MAIN = '/';
const ADMIN_PAGE = 'admin-page';

export const routeConfig = {
  [MAIN]: {
    path: MAIN,
    element: <MainPage />,
  },
  [ADMIN_PAGE]: {
    path: ADMIN_PAGE,
    element: <AdminPage />,
  },
};
