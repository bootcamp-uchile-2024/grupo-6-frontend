import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ILibro, validateValues } from '../interfaces/ILibro';
import '../styles/create_product.css'
import { IErrorsLibro } from '../interfaces/IErrorsLibro';
import axios from 'axios';

const CrearProducto = () => {
    const navigate = useNavigate();

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
        isbn: false,
        nombre: false,
        autor: false,
        precio: false,
        stockLibro: false,
        genero: false,
        editorial: false,
        idioma: false,
        encuadernacion: false,
        agnoPublicacion: false,
        numeroPaginas: false,
        descuento: false,
        caratula: false,
        dimensiones: false,
        ean: false,
        resumen: false
    });

    // Manejar cambios en los campos de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setLibro({
        ...libro,
        [name]: convertValue(name as keyof ILibro, value)
        })
    };

// Función para convertir el valor según el tipo de la clave
const convertValue = (name: keyof ILibro, value: string): any => {
    switch (name) {
        case "nombre":
        case "isbn":
        case "editorial":
        case "idioma":
        case "encuadernacion":
        case "agnoPublicacion":
        case "caratula":
        case "dimensiones":
        case "ean":
        case "resumen":
            return value; // `string`
        case "autor":
        case "genero":
            return value.split(","); // `string[]` -> Convertir valor separado por comas
        case "precio":
        case "stockLibro":
        case "numeroPaginas":
        case "descuento":
        case "calificacion":
            return Number(value); // `number`
        default:
            return value;
    }
    };

    // Manejar cambios en los arrays como autor y género
    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ILibro, index: number) => {
        const newArray = [...(libro[field] as string[])];
        newArray[index] = e.target.value;
        setLibro({
        ...libro,
        [field]: newArray
        });
    };

    // Agregar un nuevo campo para el autor o género
    const addField = (field: keyof ILibro) => {
        setLibro({
        ...libro,
        [field]: [...(libro[field] as string[]), '']
        });
    };

    // Eliminar un campo para el autor o género
    const removeField = (field: keyof ILibro, index: number) => {
        const newArray = [...(libro[field] as string[])];
        newArray.splice(index, 1);
        setLibro({
        ...libro,
        [field]: newArray
        });
    };

    // Enviar el formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setErrors(validateValues(libro, errors));
        if(errors.isbn || errors.nombre  || errors.autor  || errors.precio  || errors.stockLibro   
            || errors.genero   || errors.editorial   || errors.idioma   || errors.encuadernacion  
            || errors.agnoPublicacion   || errors.numeroPaginas   || errors.descuento  || errors.caratula  
            || errors.dimensiones  || errors.ean   || errors.resumen ){

            console.log("Los errores son: ",errors);
            navigate("/create/product");
        } else {
            console.log("Se envia el formulario");
            console.log("La estructura del form es: ", libro);
            //const { data: libroResponse, loading, error } = useFetchPost<ILibro[]>("http://localhost:3000/products", libro);
            //if (loading) return <p>Cargando datos...</p>
            //if (error) return <p>Error en la consulta de datos {error}</p>
            const response = await axios.post('/products-create-back', libro, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status == 201) {
                console.log("Libro creado correctamente al Backend");

                alert('Libro creado correctamente');
            } else {
                console.log("Error al crear el libro en el Backend");
                alert('Error al crear el libro en el Backend');
            }
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
                    {errors.isbn ? (<p className="error-producto">{"ISBN no debe estar vacio y debe tener entre 10 y 13 caracteres."}</p>) : null}

                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value={libro.nombre} onChange={handleChange} placeholder="Ej. Animales Fantásticos Maravillas de la Naturaleza"  required />
                    {errors.nombre ? (<p className="error-producto">{"El nombre del libro no debe ser vacio."}</p>) : null}

                    <label htmlFor="resumen">Resumen:</label>
                    <textarea id="resumen" name="resumen" value={libro.resumen} onChange={handleChange}  placeholder="Ej. El libro invita a toda la familia a descubrir los vínculos que existen entre las criaturas mágicas del universo de J.K. Rowling y los asombrosos animales que habitan la tierra, los mares y los cielos de nuestro planeta. A lo largo de sus páginas, didácticas y de gran belleza, se evoca la verdadera magia y majestuosidad de la naturaleza en todas sus formas"   required></textarea>
                    {errors.resumen ? (<p className="error-producto">{"El resumen no puede estar vacio."}</p>) : null}

                    <label htmlFor="editorial">Editorial:</label>
                    <input type="text" id="editorial" name="editorial" value={libro.editorial} onChange={handleChange}  placeholder="Ej. Salamandra Infantil Y Juvenil" required />
                    {errors.editorial ? (<p className="error-producto">{"La editorial no puede estar vacias."}</p>) : null}

                    <label htmlFor="idioma">Idioma:</label>
                    <input type="text" id="idioma" name="idioma" value={libro.idioma} onChange={handleChange} placeholder="Ej. Español" required />
                    {errors.idioma ? (<p className="error-producto">{"El idioma no puede estar vacias."}</p>) : null}

                    <label htmlFor="agnoPublicacion">Año de Publicación:</label>
                    <input type="text" id="agnoPublicacion" name="agnoPublicacion" value={libro.agnoPublicacion} onChange={handleChange} placeholder="Ej. 2022" required />
                    {errors.agnoPublicacion ? (<p className="error-producto">{"El año de publicacion no puede estar vacio."}</p>) : null}

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
                    {errors.autor ? (<p className="error-producto">{"El autor no puede estar vacio."}</p>) : null}

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
                    {errors.genero ? (<p className="error-producto">{"El genero del libro no debe ser vacio."}</p>) : null}


                    <label htmlFor="encuadernacion">Encuadernación:</label>
                    <select name="encuadernacion"  id="encuadernacion" value={libro.encuadernacion} onChange={handleChange} required>
                        <option value="" disabled>Seleccione la encuadernación del libro</option>
                        <option value="Tapa dura">Tapa dura</option>
                        <option value="Tapa blanda">Tapa blanda</option>
                    </select>
                    {errors.encuadernacion ? (<p className="error-producto">{"La encuadernacion no puede estar vacias."}</p>) : null}

                    <label htmlFor="numeroPaginas">Número de Páginas:</label>
                    <input type="number"  id="numeroPaginas" name="numeroPaginas" value={libro.numeroPaginas} onChange={handleChange}  min={1} required />
                    {errors.numeroPaginas ? (<p className="error-producto">{"El numero de paginas no puede estar vacio o ser menor a 1."}</p>) : null}

                    <label htmlFor="caratula">Carátula (URL):</label>
                    <input type="url" id="caratula" name="caratula" value={libro.caratula} onChange={handleChange} placeholder="Ej. https://feriachilenadellibro.cl/wp-content/uploads/2023/11/9788418637056.20220422140950.jpg" required />
                    {errors.caratula ? (<p className="error-producto">{"La url debe tener un formato valido."}</p>) : null}

                    <label htmlFor="dimensiones">Dimensiones:</label>
                    <input type="text" id="dimensiones" name="dimensiones" value={libro.dimensiones} onChange={handleChange} placeholder='Ej. 27.50 x 23.70' required />
                    {errors.dimensiones ? (<p className="error-producto">{"Las dimensiones no pueden estar vacias."}</p>) : null}

                    <label htmlFor="ean">EAN (Código de Barra):</label>
                    <input type="text" id="ean" name="ean" value={libro.ean} onChange={handleChange} required />
                    {errors.ean ? (<p className="error-producto">{"El EAN no debe estar vacio y debe tener un largo de 13 caracteres."}</p>) : null}

                    <label htmlFor="calificacion">Calificación (Por defecto es 0):</label>
                    <input type="number" id="calificacion" name="calificacion" value={libro.calificacion} onChange={handleChange} required min="0" max="5" disabled />
                </div>

                <div className='crear-producto'>
                    <h2>Información del stock y venta del producto</h2>
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" id="precio"  name="precio" value={libro.precio} onChange={handleChange} min="1000"  />
                    {errors.precio ? (<p className="error-producto">{"La precio minimo son 1000."}</p>) : null}

                    <label htmlFor="stockLibro">Stock:</label>
                    <input type="number" id="stockLibro"  name="stockLibro" value={libro.stockLibro} onChange={handleChange} min={1}  />
                    {errors.stockLibro ? (<p className="error-producto">{"El stock minimo es 1 libro."}</p>) : null}

                    <label htmlFor="descuento">Descuento:</label>
                    <input type="number"  id="descuento"  name="descuento" value={libro.descuento} onChange={handleChange} min={0}  />
                    {errors.descuento ? (<p className="error-producto">{"El descuento no puede ser menor a 0."}</p>) : null}

                </div>

                <button type="submit" className='boton-producto'>Crear Libro</button>
            </form>
        </div>
    );
};

export default CrearProducto;