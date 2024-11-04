import { AdminPage } from 'pages/AdminPage';
import { ChecksPage } from 'pages/ChecksPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { MorningCheckSetup } from 'pages/MorningCheckSetup/MorningCheckSetup';
import { SettingsPage } from 'pages/SettingPage/SettingsPage';
import { MorningCheckView } from 'pages/MorningCheckView/MorningCheckView';

export const AppRoutes = {
  MAIN: '/',
  ADMIN_PAGE: '/admin',
  CHECKS_PAGE: '/checks',
  LOGIN_PAGE: '/login',
  SETTINGS_PAGE: '/settings',
  MORNING_CHECK_SETTINGS: '/morning-check-setup',
  MORNING_CHECK_LIST: '/morning-check-view',
};

const {
  MAIN,
  ADMIN_PAGE,
  CHECKS_PAGE,
  LOGIN_PAGE,
  SETTINGS_PAGE,
  MORNING_CHECK_SETTINGS,
  MORNING_CHECK_LIST,
} = AppRoutes;

export const routeConfig = {
  [MAIN]: {
    path: MAIN,
    element: <ChecksPage />,
  },
  [ADMIN_PAGE]: {
    path: ADMIN_PAGE,
    element: <AdminPage />,
  },
  [CHECKS_PAGE]: {
    path: CHECKS_PAGE,
    element: <ChecksPage />,
  },
  [LOGIN_PAGE]: {
    path: LOGIN_PAGE,
    element: <LoginPage />,
  },
  [SETTINGS_PAGE]: {
    path: SETTINGS_PAGE,
    element: <SettingsPage />,
  },
  [MORNING_CHECK_SETTINGS]: {
    path: MORNING_CHECK_SETTINGS,
    element: <MorningCheckSetup />,
  },
  [MORNING_CHECK_LIST]: {
    path: MORNING_CHECK_LIST,
    element: <MorningCheckView />,
  },
};
