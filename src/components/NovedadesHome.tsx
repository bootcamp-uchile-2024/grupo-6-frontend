import { useEffect, useState } from 'react';
import { ILibro } from '../interfaces/ILibro.ts';
import '../styles/novedades_home.css';
import CajaNovedades from './CajaNovedades.tsx';

function NovedadesHome() {

    const [libros, setLibros] = useState<ILibro[]>([]);
    const [librosExist, setLibrosExist] = useState<boolean>(false);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await fetch('/products-back', { method: 'GET' });

                if (!response.ok) {
                    console.error('No pudimos obtener los productos');
                    setLibrosExist(false);
                    return;
                }

                const librosJson = await response.json();
                setLibros(librosJson);
                setLibrosExist(true);
            } catch (error) {
                console.error('Error al obtener los productos', error);
                setLibrosExist(false);
            }
        };

        fetchLibros();
    }, []);

    return (
        <main className='contenido-central'>
            <section id="seccion-novedades">
                <h3 className="titulo-novedades">Novedades</h3>
                <div id="productos-novedades">
                    {librosExist ? libros.map(libro => (
                        <CajaNovedades key={libro.isbn} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} isbn={libro.isbn}></CajaNovedades>
                    ))
                        :
                        <h3>Ups, no encontramos libros disponibles!!</h3>
                    }
                </div>
            </section>
        </main>
    );
};

export default NovedadesHome;