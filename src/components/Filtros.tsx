import '../styles/filtros.css';
/* import CategoryElement from './CategoryElement.tsx';
import { useEffect, useState } from 'react'; */

// Interface para la categoría
/* interface Category {
  idGenero: string;
  nombreGenero: string;
  subGeneros: string[];
} */

function Filtros() {
  /* const [category, setCategory] = useState<Category[]>([]);
  const [categoryExist, setCategoryExist] = useState<boolean>(false);

  useEffect(() => {
    async function getCategories() {
      try {

        // Simulando la respuesta del backend
        const productJson = [{
          "idGenero": "1",
          "nombreGenero": "Aventura",
          "subGeneros": []
        }];

        setCategory(productJson);
        setCategoryExist(true);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log('Error al obtener las categorias');
        setCategoryExist(false);
      }
    }

    getCategories();
  }, []);
 */
  return (
    <>
      <div className="filtros-categoria">
        <h2 className="titulo-filtro">Filtros</h2>
        <h2 className="titulo-filtro">Categorías</h2>
        <div className="checkbox-container">
          <div>
            <input id="Novelas" type="checkbox" />
            <label htmlFor="Novelas">Novelas</label>
          </div>

          <div>
            <input id="Literatura" type="checkbox" />
            <label htmlFor="Literatura">Literatura</label>
          </div>

          <div>
            <input id="Deportes" type="checkbox" />
            <label htmlFor="Deportes">Deportes</label>
          </div>

          <div>
            <input id="Biografías" type="checkbox" />
            <label htmlFor="Biografías">Biografías</label>
          </div>

          <div>
            <input id="Clásicos" type="checkbox" />
            <label htmlFor="Clásicos">Clásicos</label>
          </div>

          <div>
            <input id="Arquitectura" type="checkbox" />
            <label htmlFor="Arquitectura">Arquitectura</label>
          </div>

          <div>
            <input id="Diseño" type="checkbox" />
            <label htmlFor="Diseño">Diseño</label>
          </div>

          <div>
            <input id="Arte" type="checkbox" />
            <label htmlFor="Arte">Arte</label>
          </div>

          <div>
            <input id="Infantil" type="checkbox" />
            <label htmlFor="Infantil">Infantil</label>
          </div>

          <div>
            <input id="Juvenil" type="checkbox" />
            <label htmlFor="Juvenil">Juvenil</label>
          </div>

          <div>
            <input id="Poesía" type="checkbox" />
            <label htmlFor="Poesía">Poesía</label>
          </div>

          <div>
            <input id="Romance" type="checkbox" />
            <label htmlFor="Romance">Romance</label>
          </div>

          <div>
            <input id="Ficción" type="checkbox" />
            <label htmlFor="Ficción">Ficción</label>
          </div>

          <div>
            <input id="Terror" type="checkbox" />
            <label htmlFor="Terror">Terror</label>
          </div>

          <div>
            <input id="Misterio" type="checkbox" />
            <label htmlFor="Misterio">Misterio</label>
          </div>

          <div>
            <input id="Ilustración" type="checkbox" />
            <label htmlFor="Ilustración">Ilustración</label>
          </div>

          <div>
            <input id="Autoayuda" type="checkbox" />
            <label htmlFor="Autoayuda">Autoayuda</label>
          </div>

          <div>
            <input id="Gestión" type="checkbox" />
            <label htmlFor="Gestión">Gestión</label>
          </div>

          <div>
            <input id="Historia" type="checkbox" />
            <label htmlFor="Historia">Historia</label>
          </div>

          <div>
            <input id="Estilo-de-vida" type="checkbox" />
            <label htmlFor="Estilo-de-vida">Estilo de vida</label>
          </div>

          <div>
            <input id="Fotografía" type="checkbox" />
            <label htmlFor="Fotografía">Fotografía</label>
          </div>

          <div>
            <input id="Ciencias" type="checkbox" />
            <label htmlFor="Ciencias">Ciencias</label>
          </div>
        </div>

        {/* {categoryExist ? category.map(category => (
          <CategoryElement
            key={category.nombreGenero}
            nombreGenero={category.nombreGenero}
            idGenero={category.idGenero}
            subGeneros={category.subGeneros}
          />
        ))
          : <p>No existen pudimos cargar las categorías.</p>} */}
      </div>

      <div className='price-filter-container'>
        <h2 className="titulo-filtro">Precios entre</h2>
        <div className='price-input-container'>
          <input id="minimo" name="minimo" type='number' pattern="^[0-9]+([,.][0-9]+)?$" placeholder="$mínimo" />
          <p className="titulo-filtro">y</p>
          <input id="maximo" name="maximo" type="number" pattern="^[0-9]+([,.][0-9]+)?$" placeholder="$máximo" />
        </div>
      </div>

      <h2 className="titulo-filtro">Editorial</h2>
      <div className="checkbox-container">
        <div>
          <input id="Taschen" type="checkbox" />
          <label htmlFor="Taschen">Taschen</label>
        </div>

        <div>
          <input id="Librero" type="checkbox" />
          <label htmlFor="Librero">Librero</label>
        </div>

        <div>
          <input id="alfaguara" type="checkbox" />
          <label htmlFor="alfaguara">Alfaguara</label>
        </div>

        <div>
          <input id="deBolsillo" type="checkbox" />
          <label htmlFor="deBolsillo">De Bolsillo</label>
        </div>

        <div>
          <input id="Catatonia" type="checkbox" />
          <label htmlFor="Catatonia">Catatonia</label>
        </div>

        <div>
          <input id="Destino" type="checkbox" />
          <label htmlFor="Destino">Destino</label>
        </div>

        <div>
          <input id="Alma" type="checkbox" />
          <label htmlFor="Alma">Alma</label>
        </div>
      </div>
      <button className='filter-button'>Aplicar filtros</button>

    </>
  );
};

export default Filtros;