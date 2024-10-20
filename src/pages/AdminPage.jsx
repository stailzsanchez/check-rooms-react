import React from 'react';
import { UserManagement } from '../features/UserManagement/UserManagement';

export const AdminPage = () => {
  return (
    <div>
      <h1>Панель администратора</h1>
      <UserManagement />
    </div>
  );
};