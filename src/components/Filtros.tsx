import '../styles/estilos_home.css'

function Filtros() {

  return (
    <>
        <section id="seccionFiltros">
            <div className="filtros-categoria">
                <h2 id="tituloFiltro">Categoría</h2>
                <div className="checkbox-container">
                  <input id="artes" type="checkbox"/>
                  <label htmlFor="artes">Artes</label>
                </div>

                <div className="checkbox-container">
                  <input id="moda" type="checkbox"/>
                  <label htmlFor="moda">Moda</label>
                </div>

                <div className="checkbox-container">
                  <input id="historia" type="checkbox"/>
                  <label htmlFor="historia">Historia</label>
                </div>
            </div>
            <div className="filtros-editorial">
                <h2 id="tituloFiltro">Editorial</h2>

                <div className="checkbox-container">
                  <input id="antartica" type="checkbox"/>
                  <label htmlFor="antartica">Antartica</label>
                </div>

                <div className="checkbox-container">
                  <input id="alfaguara" type="checkbox"/>
                  <label htmlFor="alfaguara">Alfaguara</label>
                </div>

                <div className="checkbox-container">
                  <input id="deBolsillo" type="checkbox"/>
                  <label htmlFor="deBolsillo">DeBolsillo</label>
                </div>

            </div>
            <div className="filtros-precio">
                  <h2 id="tituloFiltro">Precio</h2>
                  <div className="precio-row">
                    <input id="minimo" name="minimo" type='number' pattern="^[0-9]+([,.][0-9]+)?$" placeholder="Mínimo"  value=""></input>
                    <p id="precioSeparador">  -  </p>
                    <input id="maximo" name="maximo" type="number" pattern="^[0-9]+([,.][0-9]+)?$" placeholder="Máximo"  value=""></input>
                  </div>

            </div>


            <button>Filtrar</button>
        </section>
    </>
  )
}

export default Filtros
