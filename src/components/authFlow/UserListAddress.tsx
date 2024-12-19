import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/user_modify_address.css'
import {  useState } from 'react';
import { configuracion } from '../../config/appConfiguration';
import { Link} from 'react-router-dom';
import { IDireccion } from '../../interfaces/IDireccion';
import Button from 'react-bootstrap/esm/Button';
import { jwtDecode } from 'jwt-decode';
import { useFetchGetAddressEnvioFacturacion } from '../../hooks/useFetchUser';

const UserListAddress = () => {

    const [selectedAddress, setSelectedAddress] = useState<IDireccion | null>(null);
    const [originalAddress, setOriginalAddress] = useState<IDireccion | null>(null);

    const loggedInUser = JSON.parse(localStorage.getItem('__redux__user__') || '{}');
    const decodedToken = jwtDecode<{ idUsuario: number; rol: string; exp: number }>(loggedInUser.token);
        
     const { dataEnvio: addressesEnvio,dataFacturacion: addressesFacturacion, loading: loadingAddress, error: errorAddress} = useFetchGetAddressEnvioFacturacion<IDireccion[]>(configuracion.urlJsonServerBackendUsers, decodedToken.idUsuario);
    

    if (loadingAddress) return <p>Cargando datos de las direcciones del usuario...</p>
    if (errorAddress) return <p>Error en la consulta de las direcciones del usuario {errorAddress}</p>
    
 

    // HANDLE PARA CAMBIAR DIRECCIÓN SEGÚN INPUR RADIO
    const handleAddressChangeEnvio = (addressId: number) => {
        const selected = addressesEnvio?.find((addr) => addr.idDireccion === addressId);
        console.log("Direccion envio seleccionada:", selected); 

        if (selected) {
            setSelectedAddress(selected);
            setOriginalAddress(selected);
        }
    };

    // HANDLE PARA CAMBIAR DIRECCIÓN SEGÚN INPUR RADIO
    const handleAddressChangeFacturacion = (addressId: number) => {
        const selected = addressesFacturacion?.find((addr) => addr.idDireccion === addressId);
        console.log("Direccion facturacion seleccionada:", selected); 
        if (selected) {
            setSelectedAddress(selected);
            setOriginalAddress(selected);
        }

    };
    
    // HANDLE PARA RESTAURAR INPUTS SI PRESIONO CANCELAR
    const handleCancel = () => {
        setSelectedAddress(originalAddress);
    };

    return (
        <Container>
            <Row lg={12}>
                <Col lg={8}>
                    <p className='user-mod-dir-title'>Tus direcciones</p>

                </Col>
                <Col lg={1}>
                </Col>
                <Col lg={2}>
                    <Link to={`/user/settings/address`}>
                        <Button variant="none" className='direcciones-button'>
                                Editar dirección
                        </Button>
                    </Link>
                </Col>

            </Row>
            <Row lg={12}>
                <Col lg={12}>
                </Col>

                <Col lg={12}>
                    <p className='user-mod-dir-sub'>Selecciona una dirección de Envio</p>
                </Col>

                {addressesEnvio?.map((addressesEnvio) => (
                    <Col key={addressesEnvio.idDireccion} lg={12} className='d-flex justify-content-start user-mod-dir-radio'>
                        <input
                            type="radio"
                            id={`address-${addressesEnvio.idDireccion}`}
                            name="address"
                            checked={selectedAddress?.idDireccion === addressesEnvio.idDireccion}
                            onChange={() => handleAddressChangeEnvio(addressesEnvio.idDireccion)}
                        />
                        <label htmlFor={`address-${addressesEnvio.idDireccion}`}>
                            {`${addressesEnvio.calle} ${addressesEnvio.numeroCalle}, ${addressesEnvio.comuna}, ${addressesEnvio.region}`}
                        </label>
                    </Col>
                ))}
                {addressesEnvio?.length == 0 && (
                    <p>No existen direcciones de envio.</p>
                )}

                <Col key={"nueva-direccion-envio"} lg={12} className='d-flex justify-content-start user-mod-dir-radio'>
                    <div className="d-flex flex-column gap-2">
                        <Button variant="none" className='direcciones-button-new'>
                            <Link to={`/user/address/add`}>
                                Agregar direcciones
                            </Link>
                        </Button>
                    </div>
                </Col>

                <Col lg={12}>
                    <p className='user-mod-dir-sub'>Selecciona una dirección de Facturación</p>
                </Col>

                {addressesFacturacion?.map((addressesFacturacion) => (
                    <Col key={addressesFacturacion.idDireccion} lg={12} className='d-flex justify-content-start user-mod-dir-radio'>
                        <input
                            type="radio"
                            id={`address-${addressesFacturacion.idDireccion}`}
                            name="address"
                            checked={selectedAddress?.idDireccion === addressesFacturacion.idDireccion}
                            onChange={() => handleAddressChangeFacturacion(addressesFacturacion.idDireccion)}
                        />
                        <label htmlFor={`address-${addressesFacturacion.idDireccion}`}>
                            {`${addressesFacturacion.calle} ${addressesFacturacion.numeroCalle}, ${addressesFacturacion.comuna}, ${addressesFacturacion.region}`}
                        </label>
                    </Col>
                ))}
                {addressesFacturacion?.length == 0 && (
                    <p>No existen direcciones de facturación.</p>
                )}

                <Col key={"nueva-direccion-facturacion"} lg={12} className='d-flex justify-content-start user-mod-dir-radio'>
                    <div className="d-flex flex-column gap-2">
                        <Button variant="none" className='direcciones-button-new'>
                            <Link to={`/user/address/add`}>
                                Agregar direcciones
                            </Link>
                        </Button>
                    </div>
                </Col>
            </Row>
            <div className='user-mod-dir-buttons-container'>
                <button
                    type="submit"
                    className='user-mod-dir-cancel'
                    onClick={handleCancel}>
                    Cancelar
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4121 0C5.7847 0 0.412109 5.37259 0.412109 12C0.412109 18.6275 5.7847 24 12.4121 24C19.0396 24 24.4121 18.6275 24.4121 12C24.4121 5.37259 19.0396 0 12.4121 0ZM2.25826 12C2.25826 6.39219 6.8043 1.84615 12.4121 1.84615C18.02 1.84615 22.566 6.39219 22.566 12C22.566 17.6079 18.02 22.1538 12.4121 22.1538C6.8043 22.1538 2.25826 17.6079 2.25826 12ZM17.9882 6.42421C18.3487 6.7847 18.3487 7.36916 17.9882 7.72964L13.7178 12L17.9882 16.2704C18.3487 16.6309 18.3487 17.2153 17.9882 17.5758C17.6277 17.9363 17.0432 17.9363 16.6828 17.5758L12.4124 13.3054L8.14205 17.5758C7.78156 17.9363 7.1971 17.9363 6.83662 17.5758C6.47614 17.2153 6.47614 16.6309 6.83662 16.2704L11.107 12L6.83662 7.72964C6.47613 7.36916 6.47614 6.7847 6.83662 6.42421C7.1971 6.06373 7.78156 6.06373 8.14205 6.42421L12.4124 10.6946L16.6828 6.42421C17.0433 6.06373 17.6277 6.06373 17.9882 6.42421Z" fill="#806259" />
                    </svg>
                </button>

            </div>

        </Container>
    )
}

export default UserListAddress