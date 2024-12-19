/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { IDireccion } from "../interfaces/IDireccion";


export function useFetchGeUser<T>(url: string, idUsuario: number): { data: T | null, loading: boolean, error: string | null } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true); // Reinicia el estado de loading
            setError(null);  // Limpia errores previos

            try {
                const urlRequest = url.toString().concat(`/${idUsuario}`);
                console.log("URL generada:", `${urlRequest}`);

                const response = await fetch(urlRequest, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedInUser.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.statusText} (${response.status})`);
                }

                const json = await response.json();
                console.log("Datos del usuario obtenidos:", json); // Para depuración
                setData(json);

            } catch (err) {
                console.error("Error en useFetchGeUser:", err); // Log detallado del error
                setError(err instanceof Error ? err.message : "Error desconocido");

            } finally {
                setLoading(false); // Siempre termina cargando
            }
        };

        fetchData();
    }, [url, idUsuario, loggedInUser.token]);

    return { data, loading, error };
}



export function useFetchGetAddress<T>(url: string, idUsuario: number): { data: T | null, loading: boolean, error: string | null } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');

    useEffect(() => {

        const fetchDataAddress = async () => {
            setLoading(true); // Reinicia el estado de loading
            setError(null);  // Limpia errores previos

            try {
                const urlRequest = url.toString().concat(`/${idUsuario}/addresses`);
                console.log("URL generada:", `${urlRequest}`);

                const response = await fetch(urlRequest, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedInUser.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.statusText} (${response.status})`);
                }

                const json = await response.json();
                console.log("Datos de las direcciones del usuario obtenidos:", json); // Para depuración
                setData(json);

            } catch (err) {
                console.error("Error en useFetchGetAddress:", err); // Log detallado del error
                setError(err instanceof Error ? err.message : "Error desconocido");

            } finally {
                setLoading(false); // Siempre termina cargando
            }
        };

        fetchDataAddress();
    }, [url, idUsuario, loggedInUser.token]);

    return { data, loading, error };
}



export function useFetchGetAddressEnvioFacturacion<T>(url: string, idUsuario: number): { dataEnvio:  IDireccion[]| null,dataFacturacion:  IDireccion[] | null, loading: boolean, error: string | null } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
    const [dataEnvio, setAddressesEnvio] = useState< IDireccion[] | null>(null);
    const [dataFacturacion, setAddressesFacturacion] = useState< IDireccion[]| null>(null);

    useEffect(() => {

        const fetchDataAddress = async () => {
            setLoading(true); // Reinicia el estado de loading
            setError(null);  // Limpia errores previos

            try {
                const urlRequest = url.toString().concat(`/${idUsuario}/addresses`);
                console.log("URL generada:", `${urlRequest}`);

                const response = await fetch(urlRequest, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedInUser.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.statusText} (${response.status})`);
                }

                const json = await response.json();
                console.log("Datos de las direcciones del usuario obtenidos:", json); // Para depuración
                setData(json);
                const addresses : IDireccion[] = json;
                // Filtrar direcciones en lugar de modificar estado directamente
                const envioAddresses = addresses.filter(item => item.tipoDireccion?.includes('Envio'));
                const facturacionAddresses = addresses.filter(item => item.tipoDireccion?.includes('Facturacion'));

                // Establecer los resultados filtrados en los estados
                setAddressesEnvio(envioAddresses);
                setAddressesFacturacion(facturacionAddresses);
            } catch (err) {
                console.error("Error en useFetchGetAddress:", err); // Log detallado del error
                setError(err instanceof Error ? err.message : "Error desconocido");

            } finally {
                setLoading(false); // Siempre termina cargando
            }
        };

        fetchDataAddress();
    }, [url, idUsuario, loggedInUser.token]);

    return { dataEnvio, dataFacturacion,loading, error };
}