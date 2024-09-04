import '../styles/estilos_home.css'
import CajaProducto from './CajaProducto.tsx'
function LibrosHome() {

  return (
    <>
    <section id="seccionNovedades">
        <h3 id="tituloNovedades">Novedades</h3>

        <div id="productosHome">
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
            <CajaProducto/>
        </div>
    </section>
    </>
  )
}

export default LibrosHome