import { useDispatch } from "react-redux";
import { addProductModify } from '../../states/productModify';
import iconoEditar from '../../assets/images/icono_editar.png'
import { ILibro } from "../../interfaces/ILibro";
import {  useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const ButtonProductModify = ({ libro }: { libro: ILibro | null }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddProductModify = () => {
        if (libro) { // Verificar si product no es null
            dispatch(addProductModify(libro)); 
            console.log("Libro a editar:", libro);
            navigate('/admin/update/product');

        } else {
            console.error("El libro no se puede editar.");
        }
    }


    return (
        <Button style={{backgroundColor: '#C99E92'}} onClick={handleAddProductModify}>
            Editar
        </Button>
    )
}

export default ButtonProductModify;