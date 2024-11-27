import { useDispatch } from "react-redux";
import { addProductModify } from '../../states/productModify';
import iconoEditar from '../../assets/images/icono_editar.png'
import { ILibro } from "../../interfaces/ILibro";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";
import { configuracion } from "../../config/appConfiguration";
import iconoBorrar from '../../assets/images/icono_basurero.png'
import icono3dots from '../../assets/images/dots.png'

const ButtonProductModify = ({ libro }: { libro: ILibro | null }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddProductModify = () => {
        if (libro) { // Verificar si product no es null
            dispatch(addProductModify(libro));
            console.log("Libro a editar:", libro);
            navigate('/admin/update/product');

        } else {
            console.error("El libro no se puede editar.");
        }
    }

    const handleAddProductDelete = async () => {
        if (libro) { // Verificar si product no es null
            dispatch(addProductModify(libro));
            const response = await fetch(`${configuracion.urlJsonServerBackendProducts}/${libro.isbn}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status == 200) {
                console.log("Libro eliminado correctamente al Backend");

                alert('Libro eliminado correctamente');
                console.log("Libro eliminado:", libro);
            } else {
                console.log(`Error al eliminar el libro en el Backend. Datos: ${libro} `);
                alert(`Error al eliminar el libro " ${libro.nombre} " en el Backend`);
            }


        } else {
            console.error("El libro no se puede eliminar.");
        }
    }
    return (
        <>
        <Button variant="light" onClick={handleShow}>
             <img src={icono3dots} alt="modificar libro" className="icono-modificar" style={{width: '24px', height:'24px', margin: '12px'}} />
        </Button>
        <Modal show={show} onHide={handleClose} >
                <Modal.Header style={{backgroundColor: '#F5FAFF'}} closeButton>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: '#F5FAFF'}}>
                      <div className="d-flex align-items-center flex-column ">
                          <p className='fw-bold'>{libro?.nombre}</p>
                          <p>{libro?.autor}</p>

                      </div>
                    </Modal.Body>
                <Modal.Footer className="d-flex justify-content-around" style={{backgroundColor: '#F5FAFF'}}>
                    <Button variant="secondary" onClick={handleAddProductDelete} style={{backgroundColor: '#D4E7FA', color:'#455B73'}}>
                        Eliminar Producto
                        <img src={iconoBorrar} alt="Borrar libro" className="icono-basurero" style={{width: '24px', height:'24px', margin: '12px'}} />
                    </Button>
                    <Button variant="primary" style={{backgroundColor: '#455B73'}} onClick={handleAddProductModify}>
                        Modificar Producto
                        <img src={iconoEditar} alt="Editar libro" className="icono-editar" style={{width: '24px', height:'24px', margin: '12px'}} />
                    </Button>
                </Modal.Footer>
            </Modal></>
    )
}

export default ButtonProductModify;