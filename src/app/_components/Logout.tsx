'use client';

import { useAuth } from '@/app/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { FC } from 'react';

const LogoutButton: FC = () => {
    const { setToken } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        setToken(null);
        Cookies.remove('access_token');

        router.push('/auth/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="hover:bg-gray-100 px-4 rounded-md">
            Sair
        </button>
    );
};

export default LogoutButton;
