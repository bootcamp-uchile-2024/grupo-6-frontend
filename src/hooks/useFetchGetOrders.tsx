import { useState, useEffect } from 'react';

export function useFetchGetOrders<T>(url: string, token: string): { pedidos: T | null, loading: boolean, error: string | null } {
    const [pedidos, setPedidos] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                if (response.status === 404) {
                    setPedidos([] as unknown as T);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Error al cargar los pedidos');
                }

                const data = await response.json();
                setPedidos(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message || 'Error desconocido');
                } else {
                    setError('Error desconocido');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, [url, token]);
    console.log(`Los pedidos son: ${pedidos}`)

    return { pedidos, loading, error };
};

export default useFetchGetOrders;