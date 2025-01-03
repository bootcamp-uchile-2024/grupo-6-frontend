import { useState, useEffect } from 'react';

export function useFetchGetOrders<T>(url: string, token: string): { pedidos: T | null, loading: boolean, error: string | null } {
    const [pedidos, setPedidos] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'accept': '*/*',
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al cargar los pedidos');
                }

                const data = await response.json();
                setPedidos(data);
            } catch (error: any) {
                setError(error.message || 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, [token]);

    return { pedidos, loading, error };
};

export default useFetchGetOrders;