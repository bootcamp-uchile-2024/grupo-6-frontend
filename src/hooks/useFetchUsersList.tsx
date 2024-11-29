import { useState, useEffect } from "react";

export function useFetchUsersList<T>(
    url: string,
    paginaActual: number,
    cantidad: number
): { data: T; loading: boolean; error: string | null; refetch: () => void } {
    const initialData: T = [] as unknown as T;
    const [data, setData] = useState<T>(initialData);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener los datos desde el servidor
    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}?_page=${paginaActual}&_limit=${cantidad}`);
            if (!response.ok) {
                throw new Error("Error al cargar los datos");
            }
            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Ejecutar la solicitud inicial
    useEffect(() => {
        fetchData();
    }, [url, paginaActual, cantidad]);

    return {
        data,
        loading,
        error,
        refetch: fetchData, // Devolvemos `fetchData` como `refetch`
    };
}
