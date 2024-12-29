/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ILibro, validateValues } from '../../interfaces/ILibro';
import '../../styles/create_product.css'
import { IErrorsLibro } from '../../interfaces/IErrorsLibro';
import axios from 'axios';
import { configuracion } from '../../config/appConfiguration';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';



const CrearProducto = () => {
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');

    function dataURLtoFile(dataurl: string, filename: string) {

        let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)?.[1] || '',
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
      
        return new File([u8arr], filename, {
          type: mime
        });
    }

    const handleCreateFile =  () => {
        // Crear un nuevo archivo basado en el Blob
        const defaultImage = 'data:text/plain;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAEpANUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD69ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoorpfBvhOPxE91PdztbWFqu6WRcZPU4BPTgE5oA5qivRLHw34V8UGa00qe5gvI0LK0mcN74PUcj0NcZa6De32rPpsEJkukdkYDouDgknsKAM6ivQvEHw/sdB8I3F2ZWuL+EoGkVvkBLqCMfQ9689oAKK7XQ/CFjbeHZda10yJCwzBDG21n9PxPb25rjZWVpXZE8tCSVXOcD0zQAyinxxvNIEjRnduiqMk0ygAopzK0bFWUqynBUjBFavhbw/J4m1iOzR/LTBeSTGdqjv+ZA/GgDIor0SHQfBtxqX9kR3F015uMYn3cFx2Bxj9MVzlx4OuU8WHQ43DvvGJccbCN24j2FAHPUV6HNoXg6xvhpNxcXTXmQjXAOFVj26YH5HHc1zmueD7rSfEUelR/v2nI8h+m4E459Mc5+lAHP0V6Dd+H/AAn4dmSw1O4uZ71lBkkjyFjz3wOn61z/AIy8KnwvfRiOQz2c674ZT1PqDjvyPzoA56iiigAooooAKKKKACiiigAooooAKljuZoY3jSV0jk4dVYgN9R3qKu2+Hfhuw1KRtQ1GeHyoZNqW8jAbmAByc9uR9aALfgexXwpp8/iLU/3KPH5dvEfvSZ5yB7449snpXHx+IL631S5v7adra4uGcu0f+0ckV6J4m8KyeJ77zp9ftI4l4igUArGP++uT71wEfh8y+Im0pbqEESMguGOIzgE5/SgDro3aT4Q3TMxZmmyWY5JPnLzXO+A9ATxD4gjhmGbeFTNKv94AgY/Ekfhmu5j8OqngWXQzqVl9od9wk835Pvhvr0Fcp4V1CLwT4vlhu5o5ICvkyTRcqM4YMPbIx+dAHSeINa8M+ItWj068muwIn8pHiwsKtnH/ANbOMVw3i7w23hfV2td5lhZRJFIepUkjn3BBrqV+HNr/AGl9tOsWv9lb/N3bhu25zjOce2c1h/ELxFB4h1wPandbQR+Ur4xvOSSfpz+lAGNoesT6DqUN7bbTJGfusMhgeCK9Qk8P6dbxv4nGlzG48kTDTyBhZP72P1/XGa8y8P6pDouqRXc1ot4seSsbnGG7H8DV6PxxqsevHVTPulPymI/6sp/cx6f/AK6AMvVtUn1rUJry4KmaU5O0YA7AD8KgguZbV98MrwvjG6Nip/SrWuahDqmqT3VvarZxSHIhU5A9T+NaPgq40iLVimsQpJbyoUWSTOI29T/j24oA2vh7p+iSXNtcz3u7VlYmK0kJRNw+782Oa2vCwvJviRqsmpRrFdC3JCocqFygBB7jH86o6f4EsdK1iHUZNatW02CQTId4DNg5AJzjr6dapzeOoE8ff2pGGNjt+zsccsndsfXn8KAOS1qRpNYvnf77TyE/Xca9hvI1m8S+FppP9b5M556k+Wv+JrmL7wTp2qaxJqkesWi6XNJ50g3jIycsPQd+vTPTiqXiLx2knjCyvLP95Z2B2LjjzAeHI+o4H0oAwfGztJ4s1Qt184j8BwP0rqfGn734d+HpX5kHlqD3x5Z/wFSa54VsfF2pHVrHV7WK2mCtMsh+ZCAATjscdjisj4heILS++xaXpziSysk2+YpyGOABj1AA6+5oA42iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q=='
        const newFile =  dataURLtoFile(defaultImage, 'newBook.jpg');
        console.log('Imagen por defecto:', newFile);
        return newFile;
    };

    const [libro, setLibro] = useState<ILibro>({
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
        caratula: handleCreateFile(),
        dimensiones: '',
        codigoBarra: '',
        resumen: '',
        calificacion: 0,
        destacado: false
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
        codigoBarra: false,
        resumen: false
    });

    // Manejar cambios en los campos de texto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // si el name es igual a caratula se setea el valor del archivo
        if (name === 'caratula') {
            setLibro({
                ...libro,
                [name]: (e.target as HTMLInputElement).files![0]
            });
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
                return new File([value],fileName ); // `File`
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
            navigate("/create/product");
        } else {
            console.log("Se envia el formulario");
            console.log("La estructura del form es: ", libro);

    // Crear el objeto FormData
    const formData = new FormData();
    formData.append('caratula', libro.caratula); // Adjuntar el archivo
    formData.append('isbn', libro.isbn);
    formData.append('nombre', libro.nombre);
    formData.append('precio', libro.precio.toString());
    formData.append('stockLibro', libro.stockLibro.toString());
    formData.append('autor', libro.autor.toString());
    libro.genero.forEach((genero) => formData.append('genero[]', genero)); // Array de géneros
    formData.append('editorial', libro.editorial);
    formData.append('idioma', libro.idioma);
    formData.append('encuadernacion', libro.encuadernacion);
    formData.append('agnoPublicacion', libro.agnoPublicacion);
    formData.append('numeroPaginas', libro.numeroPaginas.toString());
    formData.append('descuento', libro.descuento.toString());
    formData.append('dimensiones', libro.dimensiones);
    formData.append('codigoBarra', libro.codigoBarra);
    formData.append('resumen', libro.resumen);


            const response = await axios.post(configuracion.urlJsonServerBackendProducts, formData, {
                headers: {
                    'Authorization': `Bearer ${loggedInUser.token}`,
                    "Content-Type": "multipart/form-data"
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
                caratula: handleCreateFile(),
                dimensiones: '',
                codigoBarra: '',
                resumen: '',
                calificacion: 0,
                destacado: false
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
                                        <img src={URL.createObjectURL(libro.caratula)} alt={libro.nombre}
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
            </Container>
        </div></>
    );
};

export default CrearProducto;