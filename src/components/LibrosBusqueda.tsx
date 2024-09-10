import '../styles/estilos_home.css'
import CajaProducto from './CajaProducto.tsx'
import Filtros from './Filtros.tsx'
import { ILibro } from '../interfaces/CrearProductoEntrada.ts'
import { useState } from 'react'
import { useEffect } from 'react'
import { ProductosFiltradosSalida } from '../interfaces/ProductosFiltradosSalida.ts'

interface Post {
  userId: string,
  id: number, 
  title: string,
  body: string
}

function LibrosBusqueda() {

  const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(respuesta => respuesta.json())
                .then((data: Post[]) => {
                  console.log(data);
                    setPosts(data);
        })
    }, []);

  return (
    <>
      <main className='contenido-central'>
        <Filtros />
        <hr/>
        <section id="seccionNovedades">
          <h3 id="tituloNovedades">Categorías</h3>

          <div id="productosHome">
            
          {posts.map(post => (
                <CajaProducto 
                key={post.id}    
                userId={post.userId}
                id={post.id}
                title={post.title}
                body={post.body}/>
            ))}

          </div>
        </section>
      </main>
    </>
  )
}

export default LibrosBusqueda