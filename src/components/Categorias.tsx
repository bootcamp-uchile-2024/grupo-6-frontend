/* eslint-disable @typescript-eslint/no-unused-vars */
import '../styles/categorias.css'
import { CajaCategoria } from './CajaCategoria.tsx'
import Filtros from './Filtros.tsx'
import { ILibro } from '../interfaces/ILibro.ts'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export function Categorias() {

  const [libros, setLibros] = useState<ILibro[]>([]);

  const [librosExist, setLibrosExist] = useState<boolean>(false);

  useEffect(() => {

    async function getLibros(){
      try {
        const response = await fetch('/products-back', {
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
        <section id="seccion-categorias">
          <h3 className="titulo-categorias">Categorías</h3>

          <Link to={`/product-detail/9789585581616`}> {/* Cambiar con back */}
          <div id="productos-categorias">
          { librosExist ?  libros.map( libro => (
                      <CajaCategoria key={libro.isbn} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} isbn={libro.isbn}  ></CajaCategoria>
                  )) 
                  :
                  <h3>Ups, no encontramos libros disponibles!!</h3>
                  }
          </div>
          </Link>
        </section>
      </main>
    </>
  )
}