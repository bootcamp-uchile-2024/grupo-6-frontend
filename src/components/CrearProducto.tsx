import { useState } from 'react';
import { ILibro } from '../interfaces/ILibro';
import '../styles/create-product.css'
const CrearProducto = () => {
    // Estados para cada campo del formulario
    const [libro, setLibro] = useState<ILibro>({
        isbn: '',
        nombre: '',
        autor: [''],
        precio: 0,
        stockLibro: 0,
        genero: [''],
        editorial: '',
        idioma: '',
        encuadernacion: '',
        agnoPublicacion: '',
        numeroPaginas: 0,
        descuento: 0,
        caratula: '',
        dimensiones: '',
        ean: '',
        resumen: '',
        calificacion: 0
    });

    // Manejar cambios en los campos de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLibro({
        ...libro,
        [name]: value
        });
    };

    // Manejar cambios en los arrays como autor y género
    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Libro, index: number) => {
        const newArray = [...(libro[field] as string[])];
        newArray[index] = e.target.value;
        setLibro({
        ...libro,
        [field]: newArray
        });
    };

    // Agregar un nuevo campo para el autor o género
    const addField = (field: keyof Libro) => {
        setLibro({
        ...libro,
        [field]: [...(libro[field] as string[]), '']
        });
    };

    // Eliminar un campo para el autor o género
    const removeField = (field: keyof Libro, index: number) => {
        const newArray = [...(libro[field] as string[])];
        newArray.splice(index, 1);
        setLibro({
        ...libro,
        [field]: newArray
        });
    };

    // Enviar el formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(libro); // Aquí podrías enviar los datos del libro a una API o manejarlos como necesites
    };
    return (
        <div className="caja-crear-producto">
            <h1>Crear un nuevo producto</h1>
            <p>En esta sección, puede agregar los datos basicos, especificos y el stock de un nuevo libro.</p>

            <form className="form-crear-producto" onSubmit={handleSubmit}>

                <div className='crear-producto'>
                    <h2>Información basica del producto</h2>
                    <label>ISBN:</label>
                    <input type="text" name="isbn" value={libro.isbn} onChange={handleChange} required />

                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={libro.nombre} onChange={handleChange} required />

                    <label>Resumen:</label>
                    <textarea name="resumen" value={libro.resumen} onChange={handleChange} required></textarea>

                    <label>Editorial:</label>
                    <input type="text" name="editorial" value={libro.editorial} onChange={handleChange} required />

                    <label>Idioma:</label>
                    <input type="text" name="idioma" value={libro.idioma} onChange={handleChange} required />

                    <label>Año de Publicación:</label>
                    <input type="text" name="agnoPublicacion" value={libro.agnoPublicacion} onChange={handleChange} required />

                    <label>Autores:</label>
                    {libro.autor.map((autor, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => handleArrayChange(e, 'autor', index)}
                            required
                        />
                        <button type="button" className='boton-add boton-producto' onClick={() => addField('autor')}>+</button>
                        <button type="button" className='boton-remove boton-producto' onClick={() => removeField('autor', index)} disabled={libro.autor.length === 1}>
                            -
                        </button>
                        </div>
                    ))}
                    
                </div>
                    
                <div className='crear-producto'>
                <h2>Información especifica del producto</h2>

                    <label>Géneros:</label>

                    {libro.genero.map((genero, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            value={genero}
                            onChange={(e) => handleArrayChange(e, 'genero', index)}
                            required
                        />
                        <button type="button" className='boton-add boton-producto' onClick={() => addField('genero')}>+</button>

                        <button type="button" className='boton-remove boton-producto' onClick={() => removeField('genero', index)} disabled={libro.genero.length === 1}>
                            -
                        </button>
                        </div>
                    ))}

                    <label>Encuadernación:</label>
                    <select name="encuadernacion" value={libro.encuadernacion} onChange={handleChange} required>
                        <option value="Tapa dura">Tapa dura</option>
                        <option value="Tapa blanda">Tapa blanda</option>
                    </select>

                    <label>Número de Páginas:</label>
                    <input type="number" name="numeroPaginas" value={libro.numeroPaginas} onChange={handleChange} required />

                    <label>Carátula (URL):</label>
                    <input type="text" name="caratula" value={libro.caratula} onChange={handleChange} required />

                    <label>Dimensiones:</label>
                    <input type="text" name="dimensiones" value={libro.dimensiones} onChange={handleChange} required />

                    <label>EAN (Código de Barra):</label>
                    <input type="text" name="ean" value={libro.ean} onChange={handleChange} required />

                    <label>Calificación:</label>
                    <input type="number" name="calificacion" value={libro.calificacion} onChange={handleChange} required min="0" max="5" />
                </div>

                <div className='crear-producto'>
                    <h2>Información del stock y venta del producto</h2>
                    <label>Precio:</label>
                    <input type="number" name="precio" value={libro.precio} onChange={handleChange} required />

                    <label>Stock:</label>
                    <input type="number" name="stockLibro" value={libro.stockLibro} onChange={handleChange} required />

                    <label>Descuento:</label>
                    <input type="number" name="descuento" value={libro.descuento} onChange={handleChange} required />

                </div>

                <button type="submit" className='boton-producto'>Crear Libro</button>
            </form>
        </div>
    )
}

export default CrearProducto