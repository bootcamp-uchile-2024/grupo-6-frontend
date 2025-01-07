import { useDispatch } from "react-redux";
import { addProductModify } from '../../states/productModify';
import { ILibro } from "../../interfaces/ILibro";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useState } from "react";
import { configuracion } from "../../config/appConfiguration";
import '../../styles/admin_users_list.css'

const ButtonProductModify = ({ libro }: { libro: ILibro | null }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');

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
            const response = await fetch(`${configuracion.urlJsonServerBackendProducts}${libro.isbn}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser.token}`
                }
            });

            if (response.status == 200) {
                console.log("Libro eliminado correctamente al Backend");

                alert('Libro eliminado correctamente');
                console.log("Libro eliminado:", libro);
                navigate('/admin/product');

            } else {
                console.log(`Error al eliminar el libro en el Backend. Datos: ${libro} `);
                alert(`Error al eliminar el libro " ${libro.nombre} " en el Backend`);
                navigate('/admin/product');
            }


        } else {
            console.error("El libro no se puede eliminar.");
        }
    }
    return (
        <>
            <Button variant="none" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.99992 16.6666C9.54159 16.6666 9.14936 16.5035 8.82325 16.1774C8.49659 15.8508 8.33325 15.4583 8.33325 14.9999C8.33325 14.5416 8.49659 14.1491 8.82325 13.8224C9.14936 13.4963 9.54159 13.3333 9.99992 13.3333C10.4583 13.3333 10.8508 13.4963 11.1774 13.8224C11.5035 14.1491 11.6666 14.5416 11.6666 14.9999C11.6666 15.4583 11.5035 15.8508 11.1774 16.1774C10.8508 16.5035 10.4583 16.6666 9.99992 16.6666ZM9.99992 11.6666C9.54159 11.6666 9.14936 11.5033 8.82325 11.1766C8.49659 10.8505 8.33325 10.4583 8.33325 9.99992C8.33325 9.54158 8.49659 9.14909 8.82325 8.82242C9.14936 8.49631 9.54159 8.33325 9.99992 8.33325C10.4583 8.33325 10.8508 8.49631 11.1774 8.82242C11.5035 9.14909 11.6666 9.54158 11.6666 9.99992C11.6666 10.4583 11.5035 10.8505 11.1774 11.1766C10.8508 11.5033 10.4583 11.6666 9.99992 11.6666ZM9.99992 6.66659C9.54159 6.66659 9.14936 6.50325 8.82325 6.17659C8.49659 5.85047 8.33325 5.45825 8.33325 4.99992C8.33325 4.54159 8.49659 4.14936 8.82325 3.82325C9.14936 3.49659 9.54159 3.33325 9.99992 3.33325C10.4583 3.33325 10.8508 3.49659 11.1774 3.82325C11.5035 4.14936 11.6666 4.54159 11.6666 4.99992C11.6666 5.45825 11.5035 5.85047 11.1774 6.17659C10.8508 6.50325 10.4583 6.66659 9.99992 6.66659Z" fill="#1D2433" fill-opacity="0.8" />
                </svg>
            </Button>
            <Modal show={show} onHide={handleClose} className="modal-user-list" centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center flex-column ">
                        <p className='fw-bold id-user-admin-userList'>{libro?.nombre}</p>
                        <p className="nombre-user-admin-userList">{libro?.autor}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-around">
                    <Button variant="secondary" onClick={handleAddProductDelete} className="button-delete-admin-usersList">
                        Eliminar Producto
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.1775 0C8.22434 0 6.6125 1.56452 6.6125 3.52941V3.9095H3.565H0.92C0.411898 3.9095 0 4.32278 0 4.83258C0 5.34238 0.411898 5.75565 0.92 5.75565H2.645V20.4706C2.645 22.4355 4.25685 24 6.21 24H16.79C18.7432 24 20.355 22.4355 20.355 20.4706V5.75565H22.08C22.5881 5.75565 23 5.34238 23 4.83258C23 4.32278 22.5881 3.9095 22.08 3.9095H19.435H16.3875V3.52941C16.3875 1.56453 14.7757 0 12.8225 0H10.1775ZM15.4649 5.75565C15.4658 5.75566 15.4666 5.75566 15.4675 5.75566C15.4684 5.75566 15.4692 5.75566 15.4701 5.75565H18.515V20.4706C18.515 21.3846 17.7585 22.1538 16.79 22.1538H6.21C5.24156 22.1538 4.485 21.3846 4.485 20.4706V5.75565H7.52993C7.53079 5.75566 7.53164 5.75566 7.5325 5.75566C7.53336 5.75566 7.53421 5.75566 7.53507 5.75565H15.4649ZM14.5475 3.9095V3.52941C14.5475 2.61541 13.791 1.84615 12.8225 1.84615H10.1775C9.20907 1.84615 8.4525 2.61542 8.4525 3.52941V3.9095H14.5475ZM8.855 9.12218C9.3631 9.12218 9.775 9.53545 9.775 10.0453V17.8643C9.775 18.3741 9.3631 18.7873 8.855 18.7873C8.3469 18.7873 7.935 18.3741 7.935 17.8643V10.0453C7.935 9.53545 8.3469 9.12218 8.855 9.12218ZM14.145 9.12218C14.6531 9.12218 15.065 9.53545 15.065 10.0453V17.8643C15.065 18.3741 14.6531 18.7873 14.145 18.7873C13.6369 18.7873 13.225 18.3741 13.225 17.8643V10.0453C13.225 9.53545 13.6369 9.12218 14.145 9.12218Z" fill="#455B73" />
                        </svg>
                    </Button>
                    <Button variant="primary" className="button-modify-admin-usersList" onClick={handleAddProductModify}>
                        Modificar Producto
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.517 0.270363C18.1565 -0.090121 17.572 -0.090121 17.2115 0.270363L13.3187 4.16322C13.3129 4.16868 13.3072 4.17423 13.3016 4.17986C13.296 4.1855 13.2904 4.19119 13.285 4.19693L0.270363 17.2115C0.0972524 17.3847 0 17.6194 0 17.8643V23.0769C0 23.5867 0.413276 24 0.923077 24H6.13575C6.38056 24 6.61535 23.9027 6.78846 23.7296L23.7296 6.78846C24.0901 6.42798 24.0901 5.84352 23.7296 5.48303L18.517 0.270363ZM13.9545 6.13822L1.84615 18.2466V22.1538H5.7534L17.8618 10.0455L13.9545 6.13822ZM19.1672 8.74003L21.7715 6.13575L17.8643 2.22851L15.26 4.83279L19.1672 8.74003Z" fill="currentColor" />
                        </svg>
                    </Button>
                </Modal.Footer>
            </Modal></>
    )
}

export default ButtonProductModify;