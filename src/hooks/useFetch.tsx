import { useEffect, useState } from "react";

export function useFetchGet<T>(url: string): { data: T | null, loading: boolean, error: string } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {

        const fetchData = async () => {

            try {
                
                const response = await fetch(url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);

                } else {
                    setError(response.statusText);
                }

            } catch (error) {
                setError(error instanceof Error ? error.message : 'error desconocido');

            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [url]);

    return { data, loading, error };
}

export function useFetchPost<T>(url: string, requestBody: T): { data: T | null, loading: boolean, error: string } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {

        const fetchDataPost = async () => {

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.ok) {
                    const json = await response.json();
                    setData(json);

                } else {
                    setError(response.statusText);
                }

            } catch (error) {
                setError(error instanceof Error ? error.message : 'error desconocido');

            } finally {
                setLoading(false);
            }
        }

        fetchDataPost();

    }, [url,requestBody]);

    return { data, loading, error };
}

export function useFetchPut<T>(url: string, requestBody: T): { data: T | null, loading: boolean, error: string } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {

        const fetchDataPost = async () => {

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.ok) {
                    const json = await response.json();
                    setData(json);

                } else {
                    setError(response.statusText);
                }

            } catch (error) {
                setError(error instanceof Error ? error.message : 'error desconocido');

            } finally {
                setLoading(false);
            }
        }

        fetchDataPost();

    }, [url,requestBody]);

    return { data, loading, error };
}

