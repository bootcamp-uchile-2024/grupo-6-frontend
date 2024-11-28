import { useFetchGet } from "./useFetch";

export function useFetchUsersList<T>(
    url: string,
    paginaActual: number,
    cantidad: number
) {
    const initialData = { usuarios: [], totalPaginas: 0 } as T;
    const { data, loading, error } = useFetchGet<T>(url, paginaActual, cantidad);
    return {
        data: data ?? initialData,
        loading,
        error,
    };
}
