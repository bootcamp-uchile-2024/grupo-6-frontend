import { useState, useEffect } from 'react';
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

  const [generos, setGeneros] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://18.222.107.138:3000/products/genres')
      .then((response) => response.json())
      .then((data) => setGeneros(data))
      .catch((error) => console.error("Hubo un error al obtener los géneros:", error));
  }, []);
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

        {/* filtros de generos*/}
        <div className="checkbox-container">
          {generos.map((genero) => (
            <div key={genero}>
              <input id={genero} type="checkbox" />
              <label htmlFor={genero}>{genero}</label>
            </div>
          ))}
        </div>
      </div>

      {/* filtros de precio*/}
      <div className='price-filter-container'>
        <h2 className="titulo-filtro">Precios entre</h2>
        <div className='price-input-container'>
          <input id="minimo" name="minimo" type='number' pattern="^[0-9]+([,.][0-9]+)?$" placeholder="$mínimo" />
          <p className="titulo-filtro">y</p>
          <input id="maximo" name="maximo" type="number" pattern="^[0-9]+([,.][0-9]+)?$" placeholder="$máximo" />
        </div>
      </div>

      <h2 className="titulo-filtro">Editorial</h2>
      
      {/* filtros de editorial*/}
      <button className='filter-button'>Aplicar filtros</button>

    </>
  );
};

export default Filtros;