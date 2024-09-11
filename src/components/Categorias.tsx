import '../styles/estilos_home.css'
import { CajaCategoria } from './CajaCategoria.tsx'
import Filtros from './Filtros.tsx'
import { ILibro } from '../interfaces/ILibro.ts'
import { useState, useEffect } from 'react'

export function Categorias() {

  const [libros, setLibros] = useState<ILibro[]>([]);

  const [librosExist, setLibrosExist] = useState<boolean>(false);

  useEffect(() => {

    async function getLibros(){
      try {
        const response = await fetch('/products-back', { //    src/data/catalog.json
          method: 'GET'
        });
        console.log(response.status);
        if(!response.statusText){
          console.log('No pudimos obtener los productos');
          setLibrosExist(false);

        }
        const librosJson = await response.json();
        console.log(librosJson);
        setLibros(librosJson);
        setLibrosExist(true);

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
        <Filtros />
        <hr/>
        <section id="seccionNovedades">
          <h3 id="tituloNovedades">Categorías</h3>

          <div id="productosHome">
          { librosExist ?  libros.map( libro => (
                      <CajaCategoria key={libro.isbn} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} isbn={libro.isbn}  ></CajaCategoria>
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