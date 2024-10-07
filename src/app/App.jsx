import { useEffect } from 'react';
import { useTelegram } from '../shared/telegram/useTelegram';
import { AppRouter } from './providers/router/AppRouter';
import './style/index.css';

export const App = () => {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="app">
      <AppRouter />
    </div>
  );
};
