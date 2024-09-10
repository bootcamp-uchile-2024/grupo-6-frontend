import '../styles/estilos_home.css'
import CajaLibroCategoria from './CajaLibroCategoria.tsx'
import Filtros from './Filtros.tsx'
import { ILibro } from '../interfaces/CrearProductoEntrada.ts'
import { useState } from 'react'
import { useEffect } from 'react'

function LibrosCategorias() {

  const [libros, setPosts] = useState<ILibro[]>([]);

  useEffect(() => {
    fetch("src/data/catalog.json")
      .then(respuesta => respuesta.json())
      .then((data: ILibro[]) => {
        console.log(data)
        setPosts(data);
      })
  }, []);

  return (
    <>
      <main className='contenido-central'>
        <Filtros />
        <hr />
        <section id="seccionNovedades">
          <h3 id="tituloNovedades">Categorías</h3>

          <div id="productosHome">

            {libros.map(libro => (
              <CajaLibroCategoria
                key={libro.isbn}
                isbn={libro.isbn}
                nombre={libro.nombre}
                autor={libro.autor}
                precio={libro.precio}
                rating={libro.rating} />
            ))}

          </div>
        </section>
      </main>
    </>
  )
}

export default LibrosCategorias