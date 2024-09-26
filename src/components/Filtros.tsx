import { useEffect, useState } from 'react';
import '../styles/estilos_home.css';
import CategoryElement from './CategoryElement.tsx';

// Interface para la categoría
interface Category {
  idGenero: string;
  nombreGenero: string;
  subGeneros: string[];
}

function Filtros() {
  const [category, setCategory] = useState<Category[]>([]);
  const [categoryExist, setCategoryExist] = useState<boolean>(false);

  useEffect(() => {
    async function getCategories() {
      try {
        // Realizar la llamada al backend para obtener las categorías
        /* const response = await fetch('/categories-back', {
          mode: 'no-cors',
          method: 'GET'
        });
        
        if (!response.ok) {
          console.log('No pudimos obtener las categorias');
          setCategoryExist(false);
        } else {
          const productsJson = await response.json();
          console.log(productsJson);
          setCategory(productsJson);
          setCategoryExist(true);
        } */

        // Ejemplo de datos para simular la respuesta del backend
        const productJson = [{
          "idGenero": "1",
          "nombreGenero": "Aventura",
          "subGeneros": []
        }];
        
        console.log(productJson);
        setCategory(productJson);
        setCategoryExist(true);

      } catch (error) {
        console.log('Error al obtener las categorias');
        setCategoryExist(false);
      }
    }

    getCategories();
  }, []);

  return (
    <>
      <section id="seccionFiltros">
        <div className="filtros-categoria">
          <h2 id="tituloFiltro">Sub-categoría</h2>
          <div className="checkbox-container">
            <input id="artes" type="checkbox" />
            <label htmlFor="artes">Artes</label>
          </div>

          <div className="checkbox-container">
            <input id="moda" type="checkbox" />
            <label htmlFor="moda">Moda</label>
          </div>

          <div className="checkbox-container">
            <input id="historia" type="checkbox" />
            <label htmlFor="historia">Historia</label>
          </div>

          {categoryExist ? category.map(category => (
            <CategoryElement 
              key={category.nombreGenero} 
              nombreGenero={category.nombreGenero} 
              idGenero={category.idGenero} 
              subGeneros={category.subGeneros} 
            />
          ))
          : <p>No existen sub-categorías desde el back.</p>}
        </div>

        <div className="filtros-editorial">
          <h2 id="tituloFiltro">Editorial</h2>

          <div className="checkbox-container">
            <input id="antartica" type="checkbox" />
            <label htmlFor="antartica">Antártica</label>
          </div>

          <div className="checkbox-container">
            <input id="alfaguara" type="checkbox" />
            <label htmlFor="alfaguara">Alfaguara</label>
          </div>

          <div className="checkbox-container">
            <input id="deBolsillo" type="checkbox" />
            <label htmlFor="deBolsillo">De Bolsillo</label>
          </div>
        </div>

        <div className="filtros-precio">
          <h2 id="tituloFiltro">Precio</h2>
          <div className="precio-row">
            <input id="minimo" name="minimo" type='number' pattern="^[0-9]+([,.][0-9]+)?$" placeholder="Mínimo" />
            <p id="precioSeparador"> - </p>
            <input id="maximo" name="maximo" type="number" pattern="^[0-9]+([,.][0-9]+)?$" placeholder="Máximo" />
          </div>
        </div>

        <button>Filtrar</button>
      </section>
    </>
  );
}

export default Filtros;