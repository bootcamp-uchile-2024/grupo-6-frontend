import '../styles/estilos_home.css'
import CajaProducto from './CajaProducto.tsx'
import Filtros from './Filtros.tsx'
import { CrearProductoEntrada } from '../interfaces/CrearProductoEntrada.ts'
import { ProductosFiltradosSalida } from '../interfaces/ProductosFiltradosSalida.ts'


/* interface LibrosBusquedaProps{
  genero: string
} */

function LibrosBusqueda(/* props: LibrosBusquedaProps */) {

  return (
    <>
      <main className='contenido-central'>
        <Filtros />
        <hr/>
        <section id="seccionNovedades">
          <h3 id="tituloNovedades">Aventura{/* {props.genero} */}</h3>

          <div id="productosHome">
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
            <CajaProducto />
          </div>
        </section>
      </main>
    </>
  )
}

export default LibrosBusqueda