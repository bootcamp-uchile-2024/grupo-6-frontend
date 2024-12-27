import { useState, useEffect } from 'react';
import '../styles/filtros.css';
import { configuracion } from '../config/appConfiguration';

interface FiltrosProps {
  actualizarGeneros: (generos: string[]) => void;
  actualizarEditoriales: (editoriales: string[]) => void;
  actualizarPrecioMinimo: (precio: number) => void;
  actualizarPrecioMaximo: (precio: number) => void;
}

function Filtros({ actualizarGeneros, actualizarEditoriales, actualizarPrecioMinimo, actualizarPrecioMaximo }: FiltrosProps) {

  // ESTADOS GÉENROS
  const [generos, setGeneros] = useState<string[]>([]);
  const [generosFiltrados, setGenerosFiltrados] = useState<Record<string, boolean>>({});

  // ESTADOS EDITORIALES
  const [editoriales, setEditoriales] = useState<string[]>([]);
  const [editorialesFiltradas, setEditorialesFiltradas] = useState<Record<string, boolean>>({});
  const [mostrarMasEditoriales, setMostrarMasEditoriales] = useState<boolean>(false);

  // ESTADOS PRECIOS
  const [precioMinimo, setPrecioMinimo] = useState<string>('');
  const [precioMaximo, setPrecioMaximo] = useState<string>('');

  // LLAMADA A GÉNEROS
  useEffect(() => {
    fetch(configuracion.urlJsonServerBackendGenres)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        setGeneros(data);
      })
      .catch((error) => console.error('Hubo un error:', error));
  }, []);

  // LLAMADA A EDITORIALES
  useEffect(() => {
    fetch(configuracion.urlJsonServerBackendPublishers)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then((data) => {
        setEditoriales(data);
      })
      .catch((error) => console.error('Hubo un error:', error));
  }, []);

  // HANDLE DE GÉNEROS
  const handleOnGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoEstado = {
      ...generosFiltrados,
      [e.target.value]: e.target.checked,
    };
    setGenerosFiltrados(nuevoEstado);
  };

  // HANDLE DE EDITORIALES
  const handleOnEditorial = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevoEstado = {
      ...editorialesFiltradas,
      [e.target.value]: e.target.checked,
    };
    setEditorialesFiltradas(nuevoEstado);
  };

  // HANDLE DE PRECIOS
  const handlePrecioMinimoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecioMinimo(e.target.value);
  };

  const handlePrecioMaximoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecioMaximo(e.target.value);
  }

  // HANDLE APLICAR TODOS LOS FILTROS
  const handleAplicarFiltros = () => {
    const generosSeleccionados = Object.keys(generosFiltrados).filter(
      (genero) => generosFiltrados[genero]
    );
    const editorialesSeleccionadas = Object.keys(editorialesFiltradas).filter(
      (editorial) => editorialesFiltradas[editorial]
    );
    const precioMinimoNum = precioMinimo ? Number(precioMinimo) : 0;
    const precioMaximoNum = precioMaximo ? Number(precioMaximo) : 0;

    // Enviar los filtros al componente Categorias
    actualizarGeneros(generosSeleccionados);
    actualizarEditoriales(editorialesSeleccionadas);
    actualizarPrecioMinimo(precioMinimoNum);
    actualizarPrecioMaximo(precioMaximoNum);
  };

  // BOTONES "VER MÁS + VER MENOS"
  const handleVerMasEditoriales = () => {
    setMostrarMasEditoriales(true);
  };

  const handleVerMenosEditoriales = () => {
    setMostrarMasEditoriales(false);
  };

  return (
    <>
      <div className="filtros-categoria">
        <h2 className="titulo-filtro">Filtros</h2>
        <h2 className="titulo-filtro">Categorías</h2>

        {/* GÉNEROS */}
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

      {/* PRECIOS */}
      <div className='price-filter-container'>
        <h2 className="titulo-filtro">Precios entre</h2>
        <div className='price-input-container'>
          <input
            id="minimo"
            name="minimo"
            type='number'
            pattern="^[0-9]+([,.][0-9]+)?$"
            placeholder="$mínimo"
            value={precioMinimo}
            onChange={handlePrecioMinimoChange} />
          <p className="titulo-filtro">y</p>
          <input
            id="maximo"
            name="maximo"
            type="number"
            pattern="^[0-9]+([,.][0-9]+)?$"
            placeholder="$máximo"
            value={precioMaximo}
            onChange={handlePrecioMaximoChange} />
        </div>
      </div>

      {/* EDITORIALES */}
      <h2 className="titulo-filtro">Editorial</h2>
      <div className="checkbox-container">
        {editoriales.slice(0, mostrarMasEditoriales ? editoriales.length : 7).map((editorial) => (
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

      {/* VER MÁS + VER MENOS */}
      {!mostrarMasEditoriales && editoriales.length > 7 && (
        <button className="ver-mas-button" onClick={handleVerMasEditoriales}>Ver más</button>
      )}

      {mostrarMasEditoriales && (
        <button className="ver-menos-button" onClick={handleVerMenosEditoriales}>Ver menos</button>
      )}

      {/* BOTÓN APLICAR FILTROS */}
      <button
        type="button"
        className='filter-button'
        onClick={handleAplicarFiltros}
      >Aplicar filtros</button>

    </>
  );
};

export default Filtros;