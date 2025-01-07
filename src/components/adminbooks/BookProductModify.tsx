/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ILibro, validateValues } from '../../interfaces/ILibro';
import '../../styles/modify_product.css'
import { IErrorsLibro } from '../../interfaces/IErrorsLibro';
import { RootType } from '../../states/store';
import { useSelector } from 'react-redux';
import { configuracion } from '../../config/appConfiguration';
import Form from 'react-bootstrap/esm/Form';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';




const BookProductModify = () => {
    const navigate = useNavigate();
    const url = configuracion.urlJsonServerBackendCover.toString();
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
    const [libro, setLibro] = useState<ILibro>(
        useSelector((state: RootType) => state.productModifyReducer.book)
    );
    const [imagenBase, setImagenBase] = useState<boolean>(true);


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
        codigoBarra: false,
        resumen: false
    });

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Manejar cambios en los campos de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // si el name es igual a caratula se setea el valor del archivo
        if (name === 'caratula') {
            setLibro({
                ...libro,
                [name]: (e.target as HTMLInputElement).files![0]
            });
            setImagenBase(false);
            return;
        } else {
            setLibro({
                ...libro,
                [name]: convertValue(name as keyof ILibro, value)
            });
        }
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
            case "dimensiones":
            case "codigoBarra":
            case "resumen":
                return value; // `string`
            case "caratula": {
                // Crear un archivo con el nombre del libro en mayúsculas y sin espacios
                const fileName = libro.nombre.toLowerCase().trim().replace(' ', '').concat('.jpeg');
                return new File([value], fileName); // `File`
            }
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
        if (errors.isbn || errors.nombre || errors.autor || errors.precio || errors.stockLibro
            || errors.genero || errors.editorial || errors.idioma || errors.encuadernacion
            || errors.agnoPublicacion || errors.numeroPaginas || errors.descuento || errors.caratula
            || errors.dimensiones || errors.codigoBarra || errors.resumen) {

            console.log("Los errores son: ", errors);
            navigate("/admin/update/product");
        } else {
            console.log("Se envia el libro para su modificación");
            console.log("El libro a modificar es: ", libro);

            // Se deberia cambiar por un metodo PUT
            console.log("TOKEN: ", loggedInUser.token);
            const response = await fetch(`${configuracion.urlJsonServerBackendProducts}${libro.isbn}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser.token}`
                },
                body: JSON.stringify(libro)
            });

            if (response.status == 200) {
                /* alert(`Se modifico el libro correctamente " ${libro.nombre} " en el Backend`); */
                setModalMessage(`Se modificó el libro correctamente "${libro.nombre}"`);
                setShowModal(true);
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/admin/product');
                }, 3000); // Mostrar modal por 3 segundos antes de redirigir
            } else {
                console.log(`Error al modificar el libro en el Backend. Datos: ${libro} `);
                alert(`Error al modificar el libro " ${libro.nombre} " en el Backend`);
            }
            setLibro({
                isbn: '',
                nombre: '',
                autor: '',
                precio: 0,
                stockLibro: 0,
                genero: [''],
                editorial: '',
                idioma: '',
                encuadernacion: '',
                agnoPublicacion: '',
                numeroPaginas: 0,
                descuento: -1,
                caratula: new File([`${url}${libro.caratula}`], "filename"),
                dimensiones: '',
                codigoBarra: '',
                resumen: '',
                calificacion: 0,
                destacado: false
            });
            navigate('/admin/product')
        }

    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };


    return (
        <div className="caja-editar-producto">
            <Container className="mt-4">
                <Form onSubmit={handleSubmit}>

                    <div className='container-detail'>
                        {libro ? (
                            <>
                                <Row>
                                    {/* Imagen del libro */}
                                    {imagenBase ? (
                                        <Col xs={12} md={5} className="d-flex align-items-center justify-content-center flex-column container-update-product-button">
                                            <img src={`${url}${libro.caratula}`} alt={libro.nombre}
                                                className="img-fluid mb-3"
                                                style={{ maxHeight: '300px', objectFit: 'contain' }} />
                                            <Button variant="primary" type="submit" className="mt-3"
                                                style={{
                                                    backgroundColor: '#455B73',
                                                    color: '#F5FAFF',
                                                }}>
                                                Actualizar datos
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.9121 0C6.2847 0 0.912109 5.37259 0.912109 12C0.912109 18.6275 6.2847 24 12.9121 24C19.5396 24 24.9121 18.6275 24.9121 12C24.9121 5.37259 19.5396 0 12.9121 0ZM2.75826 12C2.75826 6.39219 7.3043 1.84615 12.9121 1.84615C18.52 1.84615 23.066 6.39219 23.066 12C23.066 17.6079 18.52 22.1538 12.9121 22.1538C7.3043 22.1538 2.75826 17.6079 2.75826 12ZM17.8349 4.92307C18.3447 4.92307 18.758 5.33635 18.758 5.84615V9.50382C18.7655 9.6997 18.7109 9.89951 18.5889 10.0719C18.4686 10.2417 18.3015 10.3586 18.1174 10.4175C18.0618 10.4354 18.0039 10.4481 17.9442 10.4551C17.9038 10.4599 17.863 10.4621 17.8221 10.4615H14.1426C13.6328 10.4615 13.2195 10.0483 13.2195 9.53846C13.2195 9.02866 13.6328 8.61538 14.1426 8.61538H14.9889C14.487 8.31663 13.9966 8.11309 13.4701 8.03903C12.6113 7.9182 11.7365 8.07973 10.9773 8.49931C10.2183 8.91889 9.61619 9.57381 9.26174 10.3652C8.9073 11.1567 8.81969 12.042 9.01213 12.8876C9.20457 13.7332 9.66662 14.4933 10.3287 15.0535C10.9909 15.6137 11.8171 15.9436 12.6828 15.9934C13.5488 16.0432 14.4074 15.8103 15.1294 15.3298C15.8513 14.8493 16.3977 14.147 16.6859 13.3292C16.8553 12.8483 17.3824 12.5959 17.8632 12.7653C18.3441 12.9348 18.5965 13.4619 18.4271 13.9427C18.0059 15.1381 17.2074 16.1644 16.1524 16.8666C15.0972 17.5689 13.8423 17.9093 12.5768 17.8365C11.3114 17.7637 10.1039 17.2816 9.13625 16.4628C8.16865 15.6441 7.49328 14.5332 7.212 13.2973C6.93074 12.0614 7.0588 10.7675 7.57684 9.61065C8.0949 8.4539 8.97494 7.49677 10.0842 6.88356C11.1936 6.2704 12.4721 6.03428 13.7273 6.21088C14.7604 6.35622 15.6204 6.80506 16.3599 7.29889C16.5486 7.42494 16.7328 7.55625 16.9118 7.68825V5.84615C16.9118 5.33635 17.3251 4.92307 17.8349 4.92307Z" fill="currentColor" />
                                                </svg>
                                            </Button>
                                            <Button variant='secondary' size='lg' onClick={() => handleNavigation("/admin/product")}>
                                                Cancelar
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.9882 6.42421C18.3487 6.7847 18.3487 7.36916 17.9882 7.72964L13.7178 12L17.9882 16.2704C18.3487 16.6309 18.3487 17.2153 17.9882 17.5758C17.6277 17.9363 17.0432 17.9363 16.6828 17.5758L12.4124 13.3054L8.14205 17.5758C7.78156 17.9363 7.1971 17.9363 6.83662 17.5758C6.47614 17.2153 6.47614 16.6309 6.83662 16.2704L11.107 12L6.83662 7.72964C6.47613 7.36916 6.47614 6.7847 6.83662 6.42421C7.1971 6.06373 7.78156 6.06373 8.14205 6.42421L12.4124 10.6946L16.6828 6.42421C17.0433 6.06373 17.6277 6.06373 17.9882 6.42421Z" fill="currentColor" />
                                                </svg>
                                            </Button>
                                        </Col>) : (
                                        <Col xs={12} md={5} className="d-flex align-items-center justify-content-center flex-column container-update-product-button">
                                            <img src={URL.createObjectURL(libro.caratula)} alt={libro.nombre}
                                                className="img-fluid mb-3"
                                                style={{ maxHeight: '300px', objectFit: 'contain' }} />
                                            <Button variant="primary" type="submit" className="mt-3"
                                                style={{
                                                    backgroundColor: '#455B73',
                                                    color: '#F5FAFF',
                                                }}>
                                                Actualizar datos
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.9121 0C6.2847 0 0.912109 5.37259 0.912109 12C0.912109 18.6275 6.2847 24 12.9121 24C19.5396 24 24.9121 18.6275 24.9121 12C24.9121 5.37259 19.5396 0 12.9121 0ZM2.75826 12C2.75826 6.39219 7.3043 1.84615 12.9121 1.84615C18.52 1.84615 23.066 6.39219 23.066 12C23.066 17.6079 18.52 22.1538 12.9121 22.1538C7.3043 22.1538 2.75826 17.6079 2.75826 12ZM17.8349 4.92307C18.3447 4.92307 18.758 5.33635 18.758 5.84615V9.50382C18.7655 9.6997 18.7109 9.89951 18.5889 10.0719C18.4686 10.2417 18.3015 10.3586 18.1174 10.4175C18.0618 10.4354 18.0039 10.4481 17.9442 10.4551C17.9038 10.4599 17.863 10.4621 17.8221 10.4615H14.1426C13.6328 10.4615 13.2195 10.0483 13.2195 9.53846C13.2195 9.02866 13.6328 8.61538 14.1426 8.61538H14.9889C14.487 8.31663 13.9966 8.11309 13.4701 8.03903C12.6113 7.9182 11.7365 8.07973 10.9773 8.49931C10.2183 8.91889 9.61619 9.57381 9.26174 10.3652C8.9073 11.1567 8.81969 12.042 9.01213 12.8876C9.20457 13.7332 9.66662 14.4933 10.3287 15.0535C10.9909 15.6137 11.8171 15.9436 12.6828 15.9934C13.5488 16.0432 14.4074 15.8103 15.1294 15.3298C15.8513 14.8493 16.3977 14.147 16.6859 13.3292C16.8553 12.8483 17.3824 12.5959 17.8632 12.7653C18.3441 12.9348 18.5965 13.4619 18.4271 13.9427C18.0059 15.1381 17.2074 16.1644 16.1524 16.8666C15.0972 17.5689 13.8423 17.9093 12.5768 17.8365C11.3114 17.7637 10.1039 17.2816 9.13625 16.4628C8.16865 15.6441 7.49328 14.5332 7.212 13.2973C6.93074 12.0614 7.0588 10.7675 7.57684 9.61065C8.0949 8.4539 8.97494 7.49677 10.0842 6.88356C11.1936 6.2704 12.4721 6.03428 13.7273 6.21088C14.7604 6.35622 15.6204 6.80506 16.3599 7.29889C16.5486 7.42494 16.7328 7.55625 16.9118 7.68825V5.84615C16.9118 5.33635 17.3251 4.92307 17.8349 4.92307Z" fill="currentColor" />
                                                </svg>
                                            </Button>
                                            <Button variant='secondary' size='lg' onClick={() => handleNavigation("/admin/product")}>
                                                Cancelar
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.9882 6.42421C18.3487 6.7847 18.3487 7.36916 17.9882 7.72964L13.7178 12L17.9882 16.2704C18.3487 16.6309 18.3487 17.2153 17.9882 17.5758C17.6277 17.9363 17.0432 17.9363 16.6828 17.5758L12.4124 13.3054L8.14205 17.5758C7.78156 17.9363 7.1971 17.9363 6.83662 17.5758C6.47614 17.2153 6.47614 16.6309 6.83662 16.2704L11.107 12L6.83662 7.72964C6.47613 7.36916 6.47614 6.7847 6.83662 6.42421C7.1971 6.06373 7.78156 6.06373 8.14205 6.42421L12.4124 10.6946L16.6828 6.42421C17.0433 6.06373 17.6277 6.06373 17.9882 6.42421Z" fill="currentColor" />
                                                </svg>
                                            </Button>
                                        </Col>)}

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

                                        {/* Campo Autor */}
                                        <Form.Group controlId="autores" className="mb-4">
                                            <Form.Label>Autor</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="autor"
                                                value={libro.autor}
                                                onChange={handleChange}
                                                placeholder="Ej. J.K. Rowling"
                                                required
                                                style={{
                                                    backgroundColor: '#F5FAFF',
                                                    color: '#455B73',
                                                }}
                                            />
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

                                        {/* Campo Carátula (Archivo)*/}
                                        <Form.Group controlId="caratula" className="mb-4">
                                            <Form.Label>Carátula</Form.Label>
                                            <Form.Control
                                                type="file"
                                                name="caratula"
                                                onChange={handleChange}
                                                required
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.caratula && (
                                                <Form.Text className="text-danger">Debe seleccionar una carátula válida.</Form.Text>
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
                                        {/* Campo codigoBarra */}
                                        <Form.Group controlId="codigoBarra" className="mb-4">
                                            <Form.Label>EAN (Código de Barra)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="codigoBarra"
                                                value={libro.codigoBarra}
                                                onChange={handleChange}
                                                placeholder="Ej. 9781234567890"
                                                required
                                                style={{ backgroundColor: '#F5FAFF', color: '#455B73' }}
                                            />
                                            {errors.codigoBarra && (
                                                <Form.Text className="text-danger">
                                                    El codigoBarra no debe estar vacío y debe tener un largo de 13 caracteres.
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

                 {/* Modal de éxito */}
            <Modal className="successful-change-modal-admin" show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header className="custom-modal-header" closeButton>
                </Modal.Header>
                <Modal.Body className="custom-modal-body">
                    <p className="title-modal-product-edit">Los cambios se realizaron con éxito.</p>
                    <p className="detail-modal-product-edit">{modalMessage}</p>
                </Modal.Body>
            </Modal>
            </Container>
        </div>
    );
};

export default BookProductModify;

