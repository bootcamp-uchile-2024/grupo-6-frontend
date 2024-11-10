import { useDispatch } from "react-redux";
import { addProductModify } from '../../states/productModify';
import iconoBorrar from '../../assets/images/icono_basurero.png'
import { ILibro } from "../../interfaces/ILibro";

const ButtonProductDelete= ({ libro }: { libro: ILibro | null }) => {
    const dispatch = useDispatch();

    const handleAddProductDelete = () => {
        if (libro) { // Verificar si product no es null
            dispatch(addProductModify(libro));
            console.log("Libro a eliminar:", libro);
            

        } else {
            console.error("El libro no se puede editar.");
        }
    }


    return (
        <button className="shoppingcart-button-delete" onClick={handleAddProductDelete}>
            <img src={iconoBorrar} alt="Borrar libro" className="icono-basurero" />
        </button>
    )
}

export default ButtonProductDelete;