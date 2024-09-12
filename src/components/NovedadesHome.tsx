import { useEffect, useState } from 'react';
import { ILibro } from '../interfaces/ILibro.ts';
import '../styles/estilos_home.css'
import CajaNovedades from './CajaNovedades.tsx'
function NovedadesHome() {

  const [libros, setLibros] = useState<ILibro[]>([]);

  const [librosExist, setLibrosExist] = useState<boolean>(false);

  useEffect(() => {

    async function getLibros(){
      try {
        const response = await fetch('/products-back', { //    src/data/catalog.json
          method: 'GET'
        });
        console.log(response.status);

        if (!response.ok) {
          console.log('No pudimos obtener los productos');
          setLibrosExist(false);

        } else {
          const librosJson = await response.json();
          console.log(librosJson);
          setLibros(librosJson);
          setLibrosExist(true);
        }


      } catch (error) {
        console.log('Error al obtener los productos');
        setLibrosExist(false);
      }
    }

    getLibros();
  }, []);

  return (
    <>
      <main className='contenido-central'>
      <section id="seccionNovedades">
          <h3 id="tituloNovedades">Novedades</h3>
          <div id="productosHome">
            { librosExist ?  libros.map( libro => (
                        <CajaNovedades key={libro.isbn} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} isbn={libro.isbn}  ></CajaNovedades>
                    )) 
                    :
                    <h3>Ups, no encontramos libros disponibles!!</h3>
                    }
          </div>
      </section>
      </main>
    </>
  )
}

export default NovedadesHome