import { Route, Routes } from 'react-router-dom';
import { routeConfig } from './routerConfig';
// import { useAuth } from '../auth/AuthContext';

export const AppRouter = () => {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <LoginPage />;
  // }

  return (
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}
