import '../styles/estilos_home.css'
import CajaNovedades from './CajaNovedades.tsx'
function NovedadesHome() {

  return (
    <>
    <section id="seccionNovedades">
        <h3 id="tituloNovedades">Novedades</h3>

        <div id="productosHome">
            <CajaNovedades/>
            <CajaNovedades/>
            <CajaNovedades/>
            <CajaNovedades/>
            <CajaNovedades/>
            <CajaNovedades/>
            <CajaNovedades/>
            <CajaNovedades/>
        </div>
    </section>
    </>
  )
}

export default NovedadesHome