import { useEffect, useState } from "react";

interface FetchOptions {
    method?: string;
    headers?: { [key: string]: string};
    body?: any;
}

export function useFetchCart<T>(url: string, options: FetchOptions): { data: T | null, loading: boolean, error: string } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fethcData = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(url, {
                    method: options.method || 'GET',
                    headers: options.headers || { 'Content-Type': 'application/json'},
                    body: options.body
                });

                if (response.ok) {
                    const json = await response.json();
                    console.log("Respuesta del backend", json);
                    setData(json);
                }

                else {
                    setError(`Error ${response.status}: ${response.statusText}`);
                }

            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error desconocido');

            } finally {
                setLoading(false);
            }
        };

        fethcData();
    }, [url, options.method, options.headers, options.body]);

    return { data, loading, error };
}
