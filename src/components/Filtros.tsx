import { useEffect, useState } from 'react';
import '../styles/estilos_home.css'
import CategoryElement from './CategoryElement.tsx';

interface Category {
  idGenero: string;
  nombreGenero: string;
  subGeneros: string[];
}
function Filtros() {
  const [category, setCategory] = useState<Category[]>([]);

  const [categoryExist, setCategoryExist] = useState<boolean>(false);

  const headers = new Headers();

  headers.append('Content-Type', '*/*');
  headers.append('Accept', '*/*');
  headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:3000/');
  headers.append('Access-Control-Allow-Credentials', 'true');
  //headers.append('GET', 'POST');

  /*const makeAPICall = async () => {
    {
      const response = await fetch('127.0.0.1:3000/categories', {mode:'no-cors', headers: headers});
      debugger;
      const data = await response.json();
      debugger;
      console.log({ data });
  }};*/

  /* useEffect(() => {
     fetch('/categories-back')
         .then(response => response.json())
         .then((data: Category[]) => {
           setCategory(data);
           setCategoryExist(true);
         });
         //makeAPICall();
 }, []);*/


  useEffect(() => {

    async function getCategories() {
      try {
        const response = await fetch('/categories-back', {
          mode: 'no-cors',
          method: 'GET'
        });
        console.log(response.status);
        if (!response.statusText) {
          console.log('No pudimos obtener los productos');
          setCategoryExist(false);

        }
        const productsJson = await response.json();

        console.log(productsJson);
        setCategory(productsJson);
        setCategoryExist(true);

      } catch (error) {
        console.log('Error al obtener los productos');
        setCategoryExist(false);
      }
    }

    getCategories();
  }, []);

  return (
    <>
      <section id="seccionFiltros">
        <div className="filtros-categoria">
          <h2 id="tituloFiltro">Categoría</h2>
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
            <CategoryElement key={category.nombreGenero} nombreGenero={category.nombreGenero} idGenero={category.idGenero} subGeneros={category.subGeneros} ></CategoryElement>
          ))
            :
            <p>No hay nada</p>
          }

        </div>
        <div className="filtros-editorial">
          <h2 id="tituloFiltro">Editorial</h2>

          <div className="checkbox-container">
            <input id="antartica" type="checkbox" />
            <label htmlFor="antartica">Antartica</label>
          </div>

          <div className="checkbox-container">
            <input id="alfaguara" type="checkbox" />
            <label htmlFor="alfaguara">Alfaguara</label>
          </div>

          <div className="checkbox-container">
            <input id="deBolsillo" type="checkbox" />
            <label htmlFor="deBolsillo">DeBolsillo</label>
          </div>

        </div>
        <div className="filtros-precio">
          <h2 id="tituloFiltro">Precio</h2>
          <div className="precio-row">
            <input id="minimo" name="minimo" type='number' pattern="^[0-9]+([,.][0-9]+)?$" placeholder="Mínimo" value=""></input>
            <p id="precioSeparador">  -  </p>
            <input id="maximo" name="maximo" type="number" pattern="^[0-9]+([,.][0-9]+)?$" placeholder="Máximo" value=""></input>
          </div>

        </div>


        <button>Filtrar</button>
      </section>
    </>
  )
}

export default Filtros