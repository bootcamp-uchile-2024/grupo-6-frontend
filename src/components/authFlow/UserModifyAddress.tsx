import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../../styles/user_modify_address.css'
import { useEffect, useState } from 'react';
import { configuracion } from '../../config/appConfiguration';
import { useNavigate } from 'react-router-dom';
import { IDireccion } from '../../interfaces/IDireccion';

const UserModifyAddress = () => {
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState<IDireccion[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<IDireccion | null>(null);
    const [originalAddress, setOriginalAddress] = useState<IDireccion | null>(null);  // COPIA DATOS ORIGINALES PARA BOTÓN CANCELAR
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // ESTADOS MODAL 
    const [showModal, setShowModal] = useState(false); //cambiar a true mientras trabajas el css
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [shouldNavigate, setShouldNavigate] = useState(false);

    // LLAMADA A LAS DIRECCIONES DEL USUARIO
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
        const userId = userData?.idUsuario;
        const token = userData?.token;

        if (!userId || !token) {
            setError("Faltan datos de usuario o token.");
            setLoading(false);
            return;
        }

        const fetchAddress = async () => {
            try {
                const response = await fetch(`${configuracion.urlJsonServerBackendUsers}/${userId}/addresses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener la dirección');
                }

                const data: IDireccion[] = await response.json();
                setAddresses(data);
                setSelectedAddress(data[0] || null); // Selecciona la primera dirección por defecto
                setOriginalAddress(data[0] || null); // Guarda copia de la dirección seleccionada
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'error desconocido');
                setLoading(false);
            }
        };

        fetchAddress();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    // HANDLE PARA CAMBIAR DIRECCIÓN SEGÚN INPUR RADIO
    const handleAddressChange = (addressId: number) => {
        const selected = addresses.find((addr) => addr.idDireccion === addressId);
        setSelectedAddress(selected || null);
        setOriginalAddress(selected || null);  // Guarda la dirección seleccionada como original
    };

    // LLAMADA PARA MODIFICAR DIRECCIÓN
    const handleSaveChanges = async () => {
        if (!selectedAddress) {
            return;
        }

        const userData = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
        const token = userData?.token;

        if (!token) {
            setError("Faltan datos de usuario o token.");
            return;
        }

        const updatedAddress = {
            calle: selectedAddress.calle,
            numeroCalle: selectedAddress.numeroCalle,
            comuna: selectedAddress.comuna,
            ciudad: selectedAddress.ciudad,
            region: selectedAddress.region,
            tipoDireccion: selectedAddress.tipoDireccion,
            numeroDepartamento: selectedAddress.numeroDepartamento,
            informacionAdicional: selectedAddress.informacionAdicional
        };

        try {
            const response = await fetch(`${configuracion.urlJsonServerBackendUsers}/address/${selectedAddress.idDireccion}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedAddress)
            });

            if (response.ok) {
                setModalTitle('Se han guardado los cambios');
                setModalMessage('Serás redirigido a tu perfil');
                setShowModal(true);
                setShouldNavigate(true); // Indica que se debe redirigir después de cerrar el modal
            } else {
                const errorData = await response.json();
                setModalTitle('Algo salió mal');
                setModalMessage(errorData.error.message);
                setShowModal(true);
                throw new Error('Error al guardar los cambios');
            }

            const data = await response.json();
            console.log('Dirección actualizada con éxito', data);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'error desconocido');
            setModalTitle('Error');
            setModalMessage('Hubo un error al crear la cuenta. Por favor, intenta de nuevo.');
            setShowModal(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedAddress) {
            setSelectedAddress({
                ...selectedAddress,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (selectedAddress) {
            const { name, value } = e.target;
            setSelectedAddress({
                ...selectedAddress,
                [name]: value
            });
        }
    };    

    // HANDLE PARA RESTAURAR INPUTS SI PRESIONO CANCELAR
    const handleCancel = () => {
        setSelectedAddress(originalAddress);
    };

    // HANDLE MODAL
    const handleCloseModal = () => {
        setShowModal(false);
        if (shouldNavigate) {
            navigate('/user'); // Redirige solo si el estado lo indica
        }
    };

    return (
        <Container>
            <Row lg={12}>
                <Col lg={12}>
                    <p className='user-mod-dir-title'>Tus direcciones</p>
                </Col>

                <Col lg={12}>
                    <p className='user-mod-dir-sub'>Selecciona una dirección</p>
                </Col>

                {addresses.map((address) => (
                    <Col key={address.idDireccion} lg={12} className='d-flex justify-content-start user-mod-dir-radio'>
                        <input
                            type="radio"
                            id={`address-${address.idDireccion}`}
                            name="address"
                            checked={selectedAddress?.idDireccion === address.idDireccion}
                            onChange={() => handleAddressChange(address.idDireccion)}
                        />
                        <label htmlFor={`address-${address.idDireccion}`}>
                            {`${address.calle} ${address.numeroCalle}, ${address.comuna}, ${address.region}`}
                        </label>
                    </Col>
                ))}

                <Col lg={12}>
                    <p className='user-mod-dir-sub'>Detalles de la dirección</p>
                </Col>

                <Col lg={5}>
                    <Form className='user-mod-dir-form'>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='calle'>Calle</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Calle"
                                name='calle'
                                value={selectedAddress?.calle || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='numeroCalle'>Numeración</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Número"
                                name='numeroCalle'
                                value={selectedAddress?.numeroCalle || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='numeroDepartamento'>Departamento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Departamento"
                                name='numeroDepartamento'
                                value={selectedAddress?.numeroDepartamento || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='comuna'>Comuna</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Comuna"
                                name='comuna'
                                value={selectedAddress?.comuna || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='ciudad'>Ciudad</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ciudad"
                                name='ciudad'
                                value={selectedAddress?.ciudad || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="region">Región</Form.Label>
                            <Form.Select
                                aria-label="Selecciona una región"
                                name="region"
                                value={selectedAddress?.region || ''}
                                onChange={handleSelectChange}
                                required
                            >
                                <option value="Arica y Parinacota">Arica y Parinacota</option>
                                <option value="Tarapacá">Tarapacá</option>
                                <option value="Antofagasta">Antofagasta</option>
                                <option value="Atacama">Atacama</option>
                                <option value="Coquimbo">Coquimbo</option>
                                <option value="Valparaíso">Valparaíso</option>
                                <option selected value="Metropolitana de Santiago">Metropolitana de Santiago</option>
                                <option value="O'Higgins">O'Higgins</option>
                                <option value="Maule">Maule</option>
                                <option value="Ñuble">Ñuble</option>
                                <option value="Biobío">Biobío</option>
                                <option value="La Araucanía">La Araucanía</option>
                                <option value="Los Ríos">Los Ríos</option>
                                <option value="Los Lagos">Los Lagos</option>
                                <option value="Aysén del General Carlos Ibáñez del Campo">Aysén del General Carlos Ibáñez del Campo</option>
                                <option value="Magallanes y de la Antártica Chilena">Magallanes y de la Antártica Chilena</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor='informacionAdicional'>Información adicional</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Información adicional"
                                name='informacionAdicional'
                                value={selectedAddress?.informacionAdicional || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <div className='user-mod-dir-buttons-container'>
                <button
                    type="submit"
                    className='user-mod-dir-cancel'
                    onClick={handleCancel}>
                    Cancelar
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.9882 6.42421C18.3487 6.7847 18.3487 7.36916 17.9882 7.72964L13.7178 12L17.9882 16.2704C18.3487 16.6309 18.3487 17.2153 17.9882 17.5758C17.6277 17.9363 17.0432 17.9363 16.6828 17.5758L12.4124 13.3054L8.14205 17.5758C7.78156 17.9363 7.1971 17.9363 6.83662 17.5758C6.47614 17.2153 6.47614 16.6309 6.83662 16.2704L11.107 12L6.83662 7.72964C6.47613 7.36916 6.47614 6.7847 6.83662 6.42421C7.1971 6.06373 7.78156 6.06373 8.14205 6.42421L12.4124 10.6946L16.6828 6.42421C17.0433 6.06373 17.6277 6.06373 17.9882 6.42421Z" fill="#806259" />
                    </svg>
                </button>

                <button
                    type="submit"
                    className='user-mod-dir-save'
                    onClick={handleSaveChanges}>
                    Guardar cambios
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM19.2184 8.96041C19.5789 8.59992 19.5789 8.01546 19.2184 7.65498C18.858 7.2945 18.2735 7.29449 17.913 7.65498L9.95032 15.6177L6.91067 12.5781C6.55019 12.2176 5.96573 12.2176 5.60524 12.5781C5.24476 12.9385 5.24477 13.523 5.60525 13.8835L9.29761 17.5758C9.65809 17.9363 10.2425 17.9363 10.603 17.5758L19.2184 8.96041Z" fill="#FBFBFB" />
                    </svg>
                </button>
            </div>

            <Modal className='custom-modal-create-address' show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className="custom-modal-header-create-address">
                </Modal.Header>
                <Modal.Body className="custom-modal-body-create-address">
                    <p className="title-modal-create-address">{modalTitle}</p>
                    <p className="detail-modal-create-address">{modalMessage}</p>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default UserModifyAddress