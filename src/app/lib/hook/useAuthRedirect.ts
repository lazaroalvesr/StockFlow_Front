'use client'

import { useAuth } from '@/app/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

const useAuthRedirect = (redirectTo: string) => {
    const { token, setToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const storedToken = Cookies.get('access_token');

        if (redirectTo === '/auth/login' || redirectTo === '/auth/register') {
            if (storedToken) {
                router.push('/');
            }
        } else {
            if (!storedToken && !token) {
                router.push('/auth/login');
            } else if (storedToken) {
                setToken(storedToken);
            }
        }
    }, [token, router, setToken, redirectTo]);
};

export default useAuthRedirect;
