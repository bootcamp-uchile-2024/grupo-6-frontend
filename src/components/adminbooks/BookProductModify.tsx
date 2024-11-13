import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ILibro, validateValues } from '../../interfaces/ILibro';
import '../../styles/modify_product.css'
import { IErrorsLibro } from '../../interfaces/IErrorsLibro';
import axios from 'axios';
import { RootType } from '../../states/store';
import { useSelector } from 'react-redux';

const BookProductModify = () => {
    const navigate = useNavigate();
    const [libro, setLibro] = useState<ILibro>(
        useSelector((state: RootType) => state.productModifyReducer.book)
    );


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
        if (errors.isbn || errors.nombre || errors.autor || errors.precio || errors.stockLibro
            || errors.genero || errors.editorial || errors.idioma || errors.encuadernacion
            || errors.agnoPublicacion || errors.numeroPaginas || errors.descuento || errors.caratula
            || errors.dimensiones || errors.ean || errors.resumen) {

            console.log("Los errores son: ", errors);
            navigate("/create/product");
        } else {
            console.log("Se envia el formulario");
            console.log("La estructura del form es: ", libro);
            //const { data: libroResponse, loading, error } = useFetchPost<ILibro[]>("http://localhost:3000/products", libro);
            //if (loading) return <p>Cargando datos...</p>
            //if (error) return <p>Error en la consulta de datos {error}</p>


            // Se deberia cambiar por un metodo PUT o revisar el POST para que actualice por isbn
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
        <div className="caja-editar-producto">
            <h1>Modificar un libro</h1>
            <p>En esta sección,puede modificar los datos de un libro existente.</p>

            <form className="form-editar-producto" onSubmit={handleSubmit}>

                <div className='container-detail'>
                    {libro ? (
                        <>
                            <div className='product-detail'>
                                <div className='img-libro-detail'>
                                    <img src='https://placehold.co/800@2x.png' alt={libro.nombre} />
                                </div>
                                <div className='info-libro-detail'>
                                    <h2>Información basica del producto</h2>
                                    <table>
                                        <tbody>
                                            <tr className='editar-producto'>
                                                <td><label htmlFor="isbn">ISBN:</label></td>
                                                <td> <input type="text" id="isbn" name="isbn" value={libro.isbn} onChange={handleChange} placeholder="Ej. 9788418637056" required /></td>
                                                <td>{errors.isbn ? (<p className="error-producto">{"ISBN no debe estar vacio y debe tener entre 10 y 13 caracteres."}</p>) : null}</td>
                                            </tr>

                                            <tr className='editar-producto'>
                                                <td><label htmlFor="nombre">Nombre:</label></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="nombre"
                                                        name="nombre"
                                                        value={libro.nombre}
                                                        onChange={handleChange}
                                                        placeholder="Ej. Animales Fantásticos Maravillas de la Naturaleza"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    {errors.nombre ? (
                                                        <p className="error-producto">{"El nombre del libro no debe ser vacío."}</p>
                                                    ) : null}
                                                </td>
                                            </tr>

                                            <tr className='editar-producto'>
                                                <td><label htmlFor="resumen">Resumen:</label></td>
                                                <td>
                                                    <textarea
                                                        id="resumen"
                                                        name="resumen"
                                                        value={libro.resumen}
                                                        onChange={handleChange}
                                                        placeholder="Ej. El libro invita a toda la familia a descubrir los vínculos que existen entre las criaturas mágicas del universo de J.K. Rowling y los asombrosos animales que habitan la tierra, los mares y los cielos de nuestro planeta..."
                                                        required
                                                    ></textarea>
                                                </td>
                                                <td>
                                                    {errors.resumen ? (
                                                        <p className="error-producto">{"El resumen no puede estar vacío."}</p>
                                                    ) : null}
                                                </td>
                                            </tr>

                                            <tr className='editar-producto'>
                                                <td><label htmlFor="editorial">Editorial:</label></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="editorial"
                                                        name="editorial"
                                                        value={libro.editorial}
                                                        onChange={handleChange}
                                                        placeholder="Ej. Salamandra Infantil Y Juvenil"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    {errors.editorial ? (
                                                        <p className="error-producto">{"La editorial no puede estar vacía."}</p>
                                                    ) : null}
                                                </td>
                                            </tr>

                                            <tr className='editar-producto'>
                                                <td><label htmlFor="idioma">Idioma:</label></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="idioma"
                                                        name="idioma"
                                                        value={libro.idioma}
                                                        onChange={handleChange}
                                                        placeholder="Ej. Español"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    {errors.idioma ? (
                                                        <p className="error-producto">{"El idioma no puede estar vacío."}</p>
                                                    ) : null}
                                                </td>
                                            </tr>

                                            <tr className='editar-producto'>
                                                <td><label htmlFor="agnoPublicacion">Año de Publicación:</label></td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        id="agnoPublicacion"
                                                        name="agnoPublicacion"
                                                        value={libro.agnoPublicacion}
                                                        onChange={handleChange}
                                                        placeholder="Ej. 2022"
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    {errors.agnoPublicacion ? (
                                                        <p className="error-producto">{"El año de publicación no puede estar vacío."}</p>
                                                    ) : null}
                                                </td>
                                            </tr>

                                            <tr className='editar-producto'>
                                                <td><label htmlFor="autores">Autores:</label></td>
                                                <td >
                                                    {libro.autor.map((autor, index) => (
                                                        <div key={index} className='td-row'>
                                                            <input
                                                                type="text"
                                                                value={autor}
                                                                onChange={(e) => handleArrayChange(e, 'autor', index)}
                                                                placeholder="Ej. J.K. Rowling"
                                                                required
                                                            />
                                                            <button type="button" className="boton-add boton-producto" onClick={() => addField('autor')}>+</button>
                                                            <button
                                                                type="button"
                                                                className="boton-remove boton-producto"
                                                                onClick={() => removeField('autor', index)}
                                                                disabled={libro.autor.length === 1}
                                                            >
                                                                -
                                                            </button>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {errors.autor ? (
                                                        <p className="error-producto">{"El autor no puede estar vacío."}</p>
                                                    ) : null}
                                                </td>
                                            </tr>

                                            <tr className='editar-producto'>
                                                <td><label htmlFor="generos">Géneros:</label></td>
                                                <td>
                                                    {libro.genero.map((genero, index) => (
                                                        <div key={index} className='td-row'>
                                                            <input
                                                                type="text"
                                                                value={genero}
                                                                onChange={(e) => handleArrayChange(e, 'genero', index)}
                                                                placeholder="Ej. Novela Juvenil"
                                                                required
                                                            />
                                                            <button type="button" className="boton-add boton-producto" onClick={() => addField('genero')}>+</button>
                                                            <button
                                                                type="button"
                                                                className="boton-remove boton-producto"
                                                                onClick={() => removeField('genero', index)}
                                                                disabled={libro.genero.length === 1}
                                                            >
                                                                -
                                                            </button>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {errors.genero ? (
                                                        <p className="error-producto">{"El género del libro no debe estar vacío."}</p>
                                                    ) : null}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>


                                </div>

                            </div>

                            <div className='libro-descripcion-detail'>
                                <h2>Ficha técnica</h2>
                                <table className='table-ficha-tecnica'>
                                    <tbody>


                                        <tr className='editar-producto'>
                                            <td><label htmlFor="encuadernacion">Encuadernación:</label></td>
                                            <td>
                                                <select name="encuadernacion" id="encuadernacion" value={libro.encuadernacion} onChange={handleChange} required>
                                                    <option value="" disabled>Seleccione la encuadernación del libro</option>
                                                    <option value="Tapa dura">Tapa dura</option>
                                                    <option value="Tapa blanda">Tapa blanda</option>
                                                </select>
                                            </td>
                                            <td>
                                                {errors.encuadernacion ? (
                                                    <p className="error-producto">{"La encuadernación no puede estar vacía."}</p>
                                                ) : null}
                                            </td>
                                        </tr>

                                        <tr className='editar-producto'>
                                            <td><label htmlFor="numeroPaginas">Número de Páginas:</label></td>
                                            <td>
                                                <input
                                                    type="number"
                                                    id="numeroPaginas"
                                                    name="numeroPaginas"
                                                    value={libro.numeroPaginas}
                                                    onChange={handleChange}
                                                    min={1}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                {errors.numeroPaginas ? (
                                                    <p className="error-producto">{"El número de páginas no puede estar vacío o ser menor a 1."}</p>
                                                ) : null}
                                            </td>
                                        </tr>

                                        <tr className='editar-producto'>
                                            <td><label htmlFor="caratula">Carátula (URL):</label></td>
                                            <td>
                                                <input
                                                    type="url"
                                                    id="caratula"
                                                    name="caratula"
                                                    value={libro.caratula}
                                                    onChange={handleChange}
                                                    placeholder="Ej. https://ejemplo.com/caratula.jpg"
                                                    required
                                                />
                                            </td>
                                            <td>
                                                {errors.caratula ? (
                                                    <p className="error-producto">{"La URL debe tener un formato válido."}</p>
                                                ) : null}
                                            </td>
                                        </tr>

                                        <tr className='editar-producto'>
                                            <td><label htmlFor="dimensiones">Dimensiones:</label></td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="dimensiones"
                                                    name="dimensiones"
                                                    value={libro.dimensiones}
                                                    onChange={handleChange}
                                                    placeholder="Ej. 27.50 x 23.70"
                                                    required
                                                />
                                            </td>
                                            <td>
                                                {errors.dimensiones ? (
                                                    <p className="error-producto">{"Las dimensiones no pueden estar vacías."}</p>
                                                ) : null}
                                            </td>
                                        </tr>

                                        <tr className='editar-producto'>
                                            <td><label htmlFor="ean">EAN (Código de Barra):</label></td>
                                            <td>
                                                <input
                                                    type="text"
                                                    id="ean"
                                                    name="ean"
                                                    value={libro.ean}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                {errors.ean ? (
                                                    <p className="error-producto">{"El EAN no debe estar vacío y debe tener un largo de 13 caracteres."}</p>
                                                ) : null}
                                            </td>
                                        </tr>

                                        <tr className='editar-producto'>
                                            <td><label htmlFor="calificacion">Calificación (Por defecto es 0):</label></td>
                                            <td>
                                                <input
                                                    type="number"
                                                    id="calificacion"
                                                    name="calificacion"
                                                    value={libro.calificacion}
                                                    onChange={handleChange}
                                                    required
                                                    min="0"
                                                    max="5"
                                                    disabled
                                                />
                                            </td>
                                            <td></td>
                                        </tr>

                                        <tr className='editar-producto'>
                                            <td><label htmlFor="precio">Precio:</label></td>
                                            <td>
                                                <input
                                                    type="number"
                                                    id="precio"
                                                    name="precio"
                                                    value={libro.precio}
                                                    onChange={handleChange}
                                                    min="1000"
                                                />
                                            </td>
                                            <td>
                                                {errors.precio ? (
                                                    <p className="error-producto">{"El precio mínimo es 1000."}</p>
                                                ) : null}
                                            </td>
                                        </tr>

                                        <tr className='editar-producto'>
                                            <td><label htmlFor="stockLibro">Stock:</label></td>
                                            <td>
                                                <input
                                                    type="number"
                                                    id="stockLibro"
                                                    name="stockLibro"
                                                    value={libro.stockLibro}
                                                    onChange={handleChange}
                                                    min={1}
                                                />
                                            </td>
                                            <td>
                                                {errors.stockLibro ? (
                                                    <p className="error-producto">{"El stock mínimo es 1 libro."}</p>
                                                ) : null}
                                            </td>
                                        </tr>

                                        <tr className='editar-producto'>
                                            <td><label htmlFor="descuento">Descuento:</label></td>
                                            <td>
                                                <input
                                                    type="number"
                                                    id="descuento"
                                                    name="descuento"
                                                    value={libro.descuento}
                                                    onChange={handleChange}
                                                    min={0}
                                                />
                                            </td>
                                            <td>
                                                {errors.descuento ? (
                                                    <p className="error-producto">{"El descuento no puede ser menor a 0."}</p>
                                                ) : null}
                                            </td>
                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <div>No se encontró el producto</div>
                    )}
                </div>
                );

                <button type="submit" className='boton-producto'>Actualizar Libro</button>
            </form>
        </div>
    );
};

export default BookProductModify;

