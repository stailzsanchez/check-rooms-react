import React, { useEffect, useState } from 'react';
import api from '../app/api/api';
import './AdminTable.css';

export const AdminTable = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            const response = await api.get(`/admins`);
            setAdmins(response.data);
        };
        fetchAdmins();
    }, []);

    return (
        <div className="admin-table">
            <h2>Администраторы</h2>
        </div>
    );
};
