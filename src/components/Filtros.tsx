import { useState, useEffect } from 'react';
import '../styles/filtros.css';
import { configuracion } from '../config/appConfiguration';

interface FiltrosProps {
  actualizarGeneros: (generos: string[]) => void;
  actualizarEditoriales: (editoriales: string[]) => void;
}

function Filtros({ actualizarGeneros, actualizarEditoriales }: FiltrosProps) {

  const [generos, setGeneros] = useState<string[]>([]);
  const [generosFiltrados, setGenerosFiltrados] = useState<Record<string, boolean>>({});
  
  const [editoriales, setEditoriales] = useState<string[]>([]);
  const [editorialesFiltradas, setEditorialesFiltradas] = useState<Record<string, boolean>>({});


  // GÉNEROS
  useEffect(() => {
    fetch(configuracion.urlJsonServerBackendGenres)
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

  // EDITORIALES
  useEffect(() => {
    fetch(configuracion.urlJsonServerBackendPublishers)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Editoriales recibidas:', data); // para ver editoriales que llegan
        setEditoriales(data);
      })
      .catch((error) => console.error('Hubo un error:', error));
  }, []);
  
  // HANDLE GÉNEROS
  const handleOnGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // HANDLE EDITORIALES
const handleOnEditorial = (e: React.ChangeEvent<HTMLInputElement>) => {
  const nuevoEstado = {
    ...editorialesFiltradas,
    [e.target.value]: e.target.checked,
  };
  setEditorialesFiltradas(nuevoEstado);

  const editorialesSeleccionadas = Object.keys(nuevoEstado).filter(
    (editorial) => nuevoEstado[editorial]
  );
  actualizarEditoriales(editorialesSeleccionadas); // Notifica a Categorias las editoriales seleccionadas
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
                  onChange={handleOnGenre}
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
        <div className="checkbox-container">
            {editoriales.map((editorial) => (
              <div key={editorial}>
                <input
                  id={editorial}
                  type="checkbox"
                  onChange={handleOnEditorial}
                  value={editorial} />
                <label htmlFor={editorial}>{editorial}</label>
              </div>
            ))}
          </div>

        <button
          type="button"
          className='filter-button'
        >Aplicar filtros</button>

      </>
    );
  };

  export default Filtros;