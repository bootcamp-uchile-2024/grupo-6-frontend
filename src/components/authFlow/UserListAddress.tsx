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
                <Col lg={4}>
                </Col>

            </Row>
            <Row lg={12}>
                <Col lg={12}>
                </Col>

                <Col lg={10}>
                    <p className='user-mod-dir-sub'>Escoge tu dirección de despacho</p>
                </Col>
                <Col lg={2}>
                    <Link to={`/user/settings/address`}>
                    
                        <Button variant="none" className='direcciones-list-button'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className='image-direcciones-icon ' >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.517 0.270363C18.1565 -0.090121 17.572 -0.090121 17.2115 0.270363L13.3187 4.16322C13.3129 4.16868 13.3072 4.17423 13.3016 4.17986C13.296 4.1855 13.2904 4.19119 13.285 4.19693L0.270363 17.2115C0.0972524 17.3847 0 17.6194 0 17.8643V23.0769C0 23.5867 0.413276 24 0.923077 24H6.13575C6.38056 24 6.61535 23.9027 6.78846 23.7296L23.7296 6.78846C24.0901 6.42798 24.0901 5.84352 23.7296 5.48303L18.517 0.270363ZM13.9545 6.13822L1.84615 18.2466V22.1538H5.7534L17.8618 10.0455L13.9545 6.13822ZM19.1672 8.74003L21.7715 6.13575L17.8643 2.22851L15.26 4.83279L19.1672 8.74003Z" fill="currentColor" />
                            </svg>
                                Editar dirección
                        </Button>
                    </Link>
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
                        <Link to={`/user/address/add`}>
                            <Button variant="none" className='direcciones-button-new'>
                            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z" fill="#806259"></path>
                            </svg>
                                Agregar direcciones
                            </Button>
                        </Link>
                    </div>
                </Col>

                <Col lg={12}>
                    <p className='user-mod-dir-sub'>Escoge tu dirección de facturación</p>
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
                        <Link to={`/user/address/add`}>
                            <Button variant="none" className='direcciones-button-new'>
                            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z" fill="#806259"></path>
                            </svg>
                                Agregar direcciones
                            </Button>
                        </Link>
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