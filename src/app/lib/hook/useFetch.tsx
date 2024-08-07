import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FetchOptions } from "../interface";

export default function <T>(url: string, options?: FetchOptions) {
    const { token } = useAuth();
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    method: options?.method || 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                        ...options?.headers
                    },
                    next: { revalidate: 1 },
                    body: options?.body ? JSON.stringify(options.body) : null,
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${url}`);
                }

                const data: T = await response.json();
                setData(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [url, options, token]);

    return { data, loading, error };
};

