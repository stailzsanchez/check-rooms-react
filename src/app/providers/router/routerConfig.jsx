import { AdminPage } from 'pages/AdminPage';
import { ChecksPage } from 'pages/ChecksPage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { MorningCheckPage } from 'pages/MorningCheckPage/MorningCheckPage';
import { SettingsPage } from 'pages/SettingPage/SettingsPage';
import { MorningCheckList } from 'pages/MorningCheckList/MorningCheckList';


export const AppRoutes = {
  MAIN: '/',
  ADMIN_PAGE: '/admin',
  CHECKS_PAGE: '/checks',
  LOGIN_PAGE: '/login',
  SETTINGS_PAGE: '/settings',
  MORNING_CHECK_ROOMS: '/morning-check-rooms',
  MORNING_CHECK_LIST: '/morning-check-list',
}

const { MAIN, ADMIN_PAGE, CHECKS_PAGE, LOGIN_PAGE, SETTINGS_PAGE, MORNING_CHECK_ROOMS, MORNING_CHECK_LIST } = AppRoutes;

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
  [SETTINGS_PAGE]: {
    path: SETTINGS_PAGE,
    element: (<SettingsPage />),
  },
  [MORNING_CHECK_ROOMS]: {
    path: MORNING_CHECK_ROOMS,
    element: (<MorningCheckPage />),
  },
  [MORNING_CHECK_LIST]: {
    path: MORNING_CHECK_LIST,
    element: (<MorningCheckList />),
  },
};
