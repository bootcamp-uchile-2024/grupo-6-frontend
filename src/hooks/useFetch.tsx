import { useEffect, useState } from "react";

export function useFetchGet<T>(url: string, paginaActual: number, cantidad: number): { data: T | null, loading: boolean, error: string | null } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true); // Reinicia el estado de loading
            setError(null);  // Limpia errores previos

            try {
                const urlRequest = url.toString().concat(`?pagina=${paginaActual}&cantidad=${cantidad}`);
                console.log("URL generada:", `${url}?pagina=${paginaActual}&cantidad=${cantidad}`);

                const response = await fetch(urlRequest);

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.statusText} (${response.status})`);
                }

                const json = await response.json();
                console.log("Datos obtenidos:", json); // Para depuración
                setData(json);

            } catch (err) {
                console.error("Error en useFetchGet:", err); // Log detallado del error
                setError(err instanceof Error ? err.message : "Error desconocido");

            } finally {
                setLoading(false); // Siempre termina cargando
            }
        };

        fetchData();
    }, [url, paginaActual, cantidad]);

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

    }, [url, requestBody]);

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

    }, [url, requestBody]);

    return { data, loading, error };
}

