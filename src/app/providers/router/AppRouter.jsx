import { Route, Routes } from 'react-router-dom';
import { routeConfig } from './routerConfig';

export const AppRouter = () => (
  <Routes>
    {Object.values(routeConfig).map(({ element, path }) => (
      <Route key={path} path={path} element={element} />
    ))}
  </Routes>
);
