import { useState, useEffect } from 'react';
import '../styles/filtros.css';

interface FiltrosProps {
  actualizarGeneros: (generos: string[]) => void;
}

function Filtros({ actualizarGeneros }: FiltrosProps) {

  const [generos, setGeneros] = useState<string[]>([]);
  const [generosFiltrados, setGenerosFiltrados] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('http://18.222.107.138:3000/products/genres')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Géneros recibidos:', data); // para ver géneros que llegan
        setGeneros(data);
      })
      .catch((error) => console.error('Hubo un error:', error));
  }, []);
  

  const handleOnCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoEstado = {
      ...generosFiltrados,
      [e.target.value]: e.target.checked,
    };
    console.log('Estado actualizado:', nuevoEstado); // géneros que están marcados
    setGenerosFiltrados(nuevoEstado);

    const generosSeleccionados = Object.keys(nuevoEstado).filter(
      (genero) => nuevoEstado[genero]
    );
    console.log('Géneros seleccionados:', generosSeleccionados);
    actualizarGeneros(generosSeleccionados); // Notifica a Categorias los géneros seleccionados
  };

    return (
      <>
        <div className="filtros-categoria">
          <h2 className="titulo-filtro">Filtros</h2>
          <h2 className="titulo-filtro">Categorías</h2>

          {/* filtros de generos*/}
          <div className="checkbox-container">
            {generos.map((genero) => (
              <div key={genero}>
                <input
                  id={genero}
                  type="checkbox"
                  onChange={handleOnCheckbox}
                  value={genero} />
                <label htmlFor={genero}>{genero}</label>
              </div>
            ))}
          </div>
        </div>

        {/* filtros de precio*/}
        <div className='price-filter-container'>
          <h2 className="titulo-filtro">Precios entre</h2>
          <div className='price-input-container'>
            <input
              id="minimo"
              name="minimo"
              type='number'
              pattern="^[0-9]+([,.][0-9]+)?$"
              placeholder="$mínimo" />
            <p className="titulo-filtro">y</p>
            <input
              id="maximo"
              name="maximo"
              type="number"
              pattern="^[0-9]+([,.][0-9]+)?$"
              placeholder="$máximo" />
          </div>
        </div>

        {/* filtros de editorial*/}
        <h2 className="titulo-filtro">Editorial</h2>

        <button
          type="button"
          className='filter-button'
        >Aplicar filtros</button>

      </>
    );
  };

  export default Filtros;