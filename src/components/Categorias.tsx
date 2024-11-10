import '../styles/categorias.css'
import { CajaCategoria } from './CajaCategoria.tsx'
import Filtros from './Filtros.tsx'
import { ILibro } from '../interfaces/ILibro.ts'
import { useState, useEffect } from 'react'
import { ILibroPaginado } from '../interfaces/ILibroPaginado.tsx'

export function Categorias() {

  const [libros, setLibros] = useState<ILibro[]>([]);
  const [librosExist, setLibrosExist] = useState<boolean>(false);
  useEffect(() => {
    async function getLibros() {
      try {
        const response = await fetch('/products-back', {
          method: 'GET',
        });

        if (!response.ok) {
          console.log('No pudimos obtener los productos');
          setLibrosExist(false);
          return; // Salir si no hay respuesta OK
        }

        const librosJson : ILibroPaginado = await response.json();
        console.log(librosJson);
        console.log("nroPagina: " + librosJson.nroPagina + ", totalPaginas: " + librosJson.totalPaginas + ", totalProductos: " + librosJson.totalProductos);
        setLibros(librosJson?.productos); 
        setLibrosExist(true);
      } catch (error) {
        console.error('Error al obtener los productos', error); // Usando 'error'
        setLibrosExist(false);
      }
    }

    getLibros();
  }, []);

  return (
    <main className='contenido-central'>
      <Filtros />
      <hr />
      <section id="seccion-categorias">
        <h3 className="titulo-categorias">Categorías</h3>

        <div id="productos-categorias">
          {librosExist ? libros.map(libro => (
            <CajaCategoria key={libro.isbn} nombre={libro.nombre} autor={libro.autor} precio={libro.precio} isbn={libro.isbn}  ></CajaCategoria>
          ))
            :
            <h3>Ups, no encontramos libros disponibles!!</h3>
          }
        </div>
      </section>
    </main>
  );
};