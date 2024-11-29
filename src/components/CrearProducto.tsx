/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ILibro, validateValues } from '../interfaces/ILibro';
import '../styles/create_product.css'
import { IErrorsLibro } from '../interfaces/IErrorsLibro';
import axios from 'axios';
import { configuracion } from '../config/appConfiguration';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';

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

    type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    // Manejar cambios en los arrays como autor y género
    const handleArrayChange = (e: React.ChangeEvent<FormControlElement>, field: keyof ILibro, index: number) => {
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
            const response = await axios.post(configuracion.urlJsonServerBackendProducts, libro, {
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

        <><div className="caja-editar-producto">
             <Container className="mt-4">
                <Form onSubmit={handleSubmit}>

                    <div className='container-detail'>
                        {libro ? (
                            <>
                                <Row>
                                    {/* Imagen del libro */}
                                    <Col xs={12} md={5} className="d-flex align-items-center justify-content-center flex-column">
                                        <img src='https://placehold.co/216x300/c7c7c7/white?font=lato' alt={libro.nombre}
                                            className="img-fluid mb-3"
                                            style={{ maxHeight: '300px', objectFit: 'contain' }} />
                                        <Button variant="primary" type="submit" className="mt-3"
                                            style={{
                                                backgroundColor: '#455B73',
                                                color: '#F5FAFF',
                                        }}>
                                            Actualizar información
                                        </Button>
                                    </Col>

                                    {/* Formulario */}
                                    <Col xs={12} md={7}>
                                        <Form.Group controlId="isbn" className="mb-3">
                                            <Form.Label>ISBN</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="isbn"
                                                value={libro.isbn}
                                                onChange={handleChange}
                                                placeholder="Ej. 9788418637056"
                                                required
                                                style={{
                                                    backgroundColor: '#F5FAFF',
                                                    color: '#455B73',
                                                }}
                                            />
                                            {errors.isbn && (
                                                <Form.Text className="text-danger">
                                                    ISBN no debe estar vacío y debe tener entre 10 y 13 caracteres.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        <Form.Group controlId="nombre" className="mb-3">
                                            <Form.Label>Título</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nombre"
                                                value={libro.nombre}
                                                onChange={handleChange}
                                                placeholder="Ej. Animales Fantásticos Maravillas de la Naturaleza"
                                                required
                                                style={{
                                                    backgroundColor: '#F5FAFF',
                                                    color: '#455B73',
                                                }}
                                            />
                                            {errors.nombre && (
                                                <Form.Text className="text-danger">
                                                    El nombre del libro no debe ser vacío.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Editorial */}
                                        <Form.Group controlId="editorial" className="mb-3">
                                            <Form.Label>Editorial</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="editorial"
                                                value={libro.editorial}
                                                onChange={handleChange}
                                                placeholder="Ej. Salamandra Infantil Y Juvenil"
                                                required
                                                style={{
                                                    backgroundColor: '#F5FAFF',
                                                    color: '#455B73',
                                                }}
                                            />
                                            {errors.editorial && (
                                                <Form.Text className="text-danger">
                                                    La editorial no puede estar vacía.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Idioma */}
                                        <Form.Group controlId="idioma" className="mb-3">
                                            <Form.Label>Idioma</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="idioma"
                                                value={libro.idioma}
                                                onChange={handleChange}
                                                placeholder="Ej. Español"
                                                required
                                                style={{
                                                    backgroundColor: '#F5FAFF',
                                                    color: '#455B73',
                                                }}
                                            />
                                            {errors.idioma && (
                                                <Form.Text className="text-danger">
                                                    El idioma no puede estar vacío.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Año de Publicación */}
                                        <Form.Group controlId="agnoPublicacion" className="mb-3">
                                            <Form.Label>Año de Publicación</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="agnoPublicacion"
                                                value={libro.agnoPublicacion}
                                                onChange={handleChange}
                                                placeholder="Ej. 2022"
                                                required
                                                style={{
                                                    backgroundColor: '#F5FAFF',
                                                    color: '#455B73',
                                                }}
                                            />
                                            {errors.agnoPublicacion && (
                                                <Form.Text className="text-danger">
                                                    El año de publicación no puede estar vacío.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Autores */}
                                        <Form.Group controlId="autores" className="mb-4">
                                            <Form.Label>Autores</Form.Label>
                                            {libro.autor.map((autor, index) => (
                                                <div key={index} className="d-flex align-items-center mb-2">
                                                    <Form.Control
                                                        type="text"
                                                        value={autor}
                                                        onChange={(e) => handleArrayChange(e, 'autor', index)}
                                                        placeholder="Ej. J.K. Rowling"
                                                        required
                                                        style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                                        className="me-2"
                                                    />
                                                    <Button variant="success" onClick={() => addField('autor')} className="me-2"
                                                        style={{
                                                            backgroundColor: '#455B73',
                                                            color: '#F5FAFF',
                                                         }}>
                                                        +
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => removeField('autor', index)}
                                                        disabled={libro.autor.length === 1}
                                                    >
                                                        -
                                                    </Button>
                                                </div>
                                            ))}
                                            {errors.autor && (
                                                <Form.Text className="text-danger">El autor no puede estar vacío.</Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Géneros */}
                                        <Form.Group controlId="generos" className="mb-4">
                                            <Form.Label>Géneros</Form.Label>
                                            {libro.genero.map((genero, index) => (
                                                <div key={index} className="d-flex align-items-center mb-2">
                                                    <Form.Control
                                                        type="text"
                                                        value={genero}
                                                        onChange={(e) => handleArrayChange(e, 'genero', index)}
                                                        placeholder="Ej. Novela Juvenil"
                                                        required
                                                        style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                                        className="me-2"
                                                    />
                                                    <Button variant="success" onClick={() => addField('genero')} className="me-2"
                                                        style={{
                                                            backgroundColor: '#455B73',
                                                            color: '#F5FAFF',
                                                         }}>
                                                        +
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => removeField('genero', index)}
                                                        disabled={libro.genero.length === 1}
                                                    >
                                                        -
                                                    </Button>
                                                </div>
                                            ))}
                                            {errors.genero && (
                                                <Form.Text className="text-danger">El género no puede estar vacío.</Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Precio */}
                                        <Form.Group controlId="precio" className="mb-4">
                                            <Form.Label>Precio</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="precio"
                                                value={libro.precio}
                                                onChange={handleChange}
                                                min="1000"
                                                placeholder="Ej. 15000"
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.precio && (
                                                <Form.Text className="text-danger">
                                                    El precio mínimo es 1000.
                                                </Form.Text>
                                            )}
                                        </Form.Group>


                                        {/* Campo Encuadernación */}
                                        <Form.Group controlId="encuadernacion" className="mb-4">
                                            <Form.Label>Encuadernación</Form.Label>
                                            <Form.Select
                                                name="encuadernacion"
                                                value={libro.encuadernacion}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Seleccione la encuadernación del libro
                                                </option>
                                                <option value="Tapa dura">Tapa dura</option>
                                                <option value="Tapa blanda">Tapa blanda</option>
                                            </Form.Select>
                                            {errors.encuadernacion && (
                                                <Form.Text className="text-danger">La encuadernación no puede estar vacía.</Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Número de Páginas */}
                                        <Form.Group controlId="numeroPaginas" className="mb-4">
                                            <Form.Label>Páginas</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="numeroPaginas"
                                                value={libro.numeroPaginas}
                                                onChange={handleChange}
                                                min={1}
                                                required
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.numeroPaginas && (
                                                <Form.Text className="text-danger">
                                                    El número de páginas no puede estar vacío o ser menor a 1.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Carátula */}
                                        <Form.Group controlId="caratula" className="mb-4">
                                            <Form.Label>Carátula (URL)</Form.Label>
                                            <Form.Control
                                                type="url"
                                                name="caratula"
                                                value={libro.caratula}
                                                onChange={handleChange}
                                                placeholder="Ej. https://ejemplo.com/caratula.jpg"
                                                required
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.caratula && (
                                                <Form.Text className="text-danger">La URL debe tener un formato válido.</Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Dimensiones */}
                                        <Form.Group controlId="dimensiones" className="mb-4">
                                            <Form.Label>Dimensiones</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="dimensiones"
                                                value={libro.dimensiones}
                                                onChange={handleChange}
                                                placeholder="Ej. 27.50 x 23.70"
                                                required
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.dimensiones && (
                                                <Form.Text className="text-danger">Las dimensiones no pueden estar vacías.</Form.Text>
                                            )}
                                        </Form.Group>
                                        {/* Campo EAN */}
                                        <Form.Group controlId="ean" className="mb-4">
                                            <Form.Label>EAN (Código de Barra)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="ean"
                                                value={libro.ean}
                                                onChange={handleChange}
                                                placeholder="Ej. 9781234567890"
                                                required
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.ean && (
                                                <Form.Text className="text-danger">
                                                    El EAN no debe estar vacío y debe tener un largo de 13 caracteres.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Calificación */}
                                        <Form.Group controlId="calificacion" className="mb-4">
                                            <Form.Label>Calificación (Por defecto es 0)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="calificacion"
                                                value={libro.calificacion}
                                                onChange={handleChange}
                                                min="0"
                                                max="5"
                                                disabled
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                        </Form.Group>


                                        {/* Campo Stock */}
                                        <Form.Group controlId="stockLibro" className="mb-4">
                                            <Form.Label>Stock</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="stockLibro"
                                                value={libro.stockLibro}
                                                onChange={handleChange}
                                                min="1"
                                                placeholder="Ej. 20"
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.stockLibro && (
                                                <Form.Text className="text-danger">
                                                    El stock mínimo es 1 libro.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        {/* Campo Descuento */}
                                        <Form.Group controlId="descuento" className="mb-4">
                                            <Form.Label>Descuento</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="descuento"
                                                value={libro.descuento}
                                                onChange={handleChange}
                                                min="0"
                                                placeholder="Ej. 10"
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.descuento && (
                                                <Form.Text className="text-danger">
                                                    El descuento no puede ser menor a 0.
                                                </Form.Text>
                                            )}
                                        </Form.Group>

                                        <Form.Group controlId="resumen" className="mb-3">
                                            <Form.Label>Argumento</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                name="resumen"
                                                value={libro.resumen}
                                                onChange={handleChange}
                                                placeholder="Ej. El libro invita a toda la familia a descubrir los vínculos que existen entre las criaturas mágicas..."
                                                required
                                                style={{
                                                    backgroundColor: '#F5FAFF',
                                                    color: '#455B73',
                                                }}
                                                rows={4}
                                            />
                                            {errors.resumen && (
                                                <Form.Text className="text-danger">
                                                    El resumen no puede estar vacío.
                                                </Form.Text>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <div>No se encontró el producto</div>
                        )}
                    </div>
                    
                </Form>
            </Container>
        </div></>
    );
};

export default CrearProducto;