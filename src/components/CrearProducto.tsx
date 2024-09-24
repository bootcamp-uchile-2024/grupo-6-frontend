import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ILibro, validateValues } from '../interfaces/ILibro';
import '../styles/create-product.css'
import { IErrorsLibro } from '../interfaces/IErrorsLibro';
const CrearProducto = () => {
    const navigate = useNavigate();

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
        descuento: -1,
        caratula: '',
        dimensiones: '',
        ean: '',
        resumen: '',
        calificacion: 0
    });

    const [errors, setErrors] = useState<IErrorsLibro>({
        isbn: '',
        nombre: '',
        autor: '',
        precio: '',
        stockLibro: '',
        genero: '',
        editorial: '',
        idioma: '',
        encuadernacion: '',
        agnoPublicacion: '',
        numeroPaginas: '',
        descuento: '',
        caratula: '',
        dimensiones: '',
        ean: '',
        resumen: ''
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
        
        setErrors(validateValues(libro, errors));
        if(errors.isbn != null || errors.nombre != null || errors.autor != null || errors.precio != null || errors.stockLibro != null  
            || errors.genero != null  || errors.editorial != null  || errors.idioma != null  || errors.encuadernacion != null 
            || errors.agnoPublicacion != null  || errors.numeroPaginas != null  || errors.descuento != null || errors.caratula != null 
            || errors.dimensiones != null || errors.ean != null  || errors.resumen != null){

            console.log("Los errores son: ",errors);
            navigate("/create/product");
        } else {
            console.log("Se envia el formulario");
            console.log("La estructura del form es: ", libro);
            setLibro({
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
                descuento: -1,
                caratula: '',
                dimensiones: '',
                ean: '',
                resumen: '',
                calificacion: 0
            });
            navigate("/create/product");
        }
        
    };
    
    

    return (
        <div className="caja-crear-producto">
            <h1>Crear un nuevo producto</h1>
            <p>En esta sección, puede agregar los datos basicos, especificos y el stock de un nuevo libro.</p>

            <form className="form-crear-producto" onSubmit={handleSubmit}>

                <div className='crear-producto'>
                    <h2>Información basica del producto</h2>
                    <label htmlFor="isbn">ISBN:</label>
                    <input type="text"  id="isbn" name="isbn" value={libro.isbn} onChange={handleChange} placeholder="Ej. 9788418637056" required />

                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value={libro.nombre} onChange={handleChange} placeholder="Ej. Animales Fantásticos Maravillas de la Naturaleza"  required />

                    <label htmlFor="resumen">Resumen:</label>
                    <textarea id="resumen" name="resumen" value={libro.resumen} onChange={handleChange}  placeholder="Ej. El libro invita a toda la familia a descubrir los vínculos que existen entre las criaturas mágicas del universo de J.K. Rowling y los asombrosos animales que habitan la tierra, los mares y los cielos de nuestro planeta. A lo largo de sus páginas, didácticas y de gran belleza, se evoca la verdadera magia y majestuosidad de la naturaleza en todas sus formas"   required></textarea>

                    <label htmlFor="editorial">Editorial:</label>
                    <input type="text" id="editorial" name="editorial" value={libro.editorial} onChange={handleChange}  placeholder="Ej. Salamandra Infantil Y Juvenil" required />

                    <label htmlFor="idioma">Idioma:</label>
                    <input type="text" id="idioma" name="idioma" value={libro.idioma} onChange={handleChange} placeholder="Ej. Español" required />

                    <label htmlFor="agnoPublicacion">Año de Publicación:</label>
                    <input type="text" id="agnoPublicacion" name="agnoPublicacion" value={libro.agnoPublicacion} onChange={handleChange} placeholder="Ej. 2022" required />

                    <label htmlFor="autores">Autores:</label>
                    {libro.autor.map((autor, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            value={autor}
                            onChange={(e) => handleArrayChange(e, 'autor', index)}
                            placeholder="Ej. J.K. Rowling"
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

                    <label htmlFor="generos">Géneros:</label>

                    {libro.genero.map((genero, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            value={genero}
                            onChange={(e) => handleArrayChange(e, 'genero', index)}
                            placeholder="Ej. Novela Juvenil" 
                            required
                        />
                        <button type="button" className='boton-add boton-producto' onClick={() => addField('genero')}>+</button>

                        <button type="button" className='boton-remove boton-producto' onClick={() => removeField('genero', index)} disabled={libro.genero.length === 1}>
                            -
                        </button>
                        </div>
                    ))}

                    <label htmlFor="encuadernacion">Encuadernación:</label>
                    <select name="encuadernacion"  id="encuadernacion" value={libro.encuadernacion} onChange={handleChange} required>
                        <option value="" disabled>Seleccione la encuadernación del libro</option>
                        <option value="Tapa dura">Tapa dura</option>
                        <option value="Tapa blanda">Tapa blanda</option>
                    </select>

                    <label htmlFor="numeroPaginas">Número de Páginas:</label>
                    <input type="number"  id="numeroPaginas" name="numeroPaginas" value={libro.numeroPaginas} onChange={handleChange}  min="1" required />

                    <label htmlFor="caratula">Carátula (URL):</label>
                    <input type="url" id="caratula" name="caratula" value={libro.caratula} onChange={handleChange} placeholder="Ej. https://feriachilenadellibro.cl/wp-content/uploads/2023/11/9788418637056.20220422140950.jpg" required />

                    <label htmlFor="dimensiones">Dimensiones:</label>
                    <input type="text" id="dimensiones" name="dimensiones" value={libro.dimensiones} onChange={handleChange} placeholder='Ej. 27.50 x 23.70' required />

                    <label htmlFor="ean">EAN (Código de Barra):</label>
                    <input type="text" id="ean" name="ean" value={libro.ean} onChange={handleChange} required />

                    <label htmlFor="calificacion">Calificación (Por defecto es 0):</label>
                    <input type="number" id="calificacion" name="calificacion" value={libro.calificacion} onChange={handleChange} required min="0" max="5" disabled />
                </div>

                <div className='crear-producto'>
                    <h2>Información del stock y venta del producto</h2>
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" id="precio"  name="precio" value={libro.precio} onChange={handleChange} min="1000" required />

                    <label htmlFor="stockLibro">Stock:</label>
                    <input type="number" id="stockLibro"  name="stockLibro" value={libro.stockLibro} onChange={handleChange} min="1" required />

                    <label htmlFor="descuento">Descuento:</label>
                    <input type="number"  id="descuento"  name="descuento" value={libro.descuento} onChange={handleChange} min="0"  />

                </div>

                <button type="submit" className='boton-producto'>Crear Libro</button>
            </form>
        </div>
    )
}

export default CrearProducto