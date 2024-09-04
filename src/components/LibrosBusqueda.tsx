import '../styles/estilos_home.css'
import CajaProducto from './CajaProducto.tsx'
import Filtros from './Filtros.tsx'
function LibrosBusqueda() {

  return (
    <>
      <main className='contenido-central'>
        <Filtros />
        <hr/>
        <section id="seccionNovedades">
          <h3 id="tituloNovedades">Productos</h3>

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
