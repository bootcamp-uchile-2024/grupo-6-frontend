import { useDispatch } from "react-redux";
import { addProductModify } from '../../states/productModify';
import iconoBorrar from '../../assets/images/icono_basurero.png'
import { ILibro } from "../../interfaces/ILibro";

const ButtonProductDelete= ({ libro }: { libro: ILibro | null }) => {
    const dispatch = useDispatch();

    const handleAddProductDelete = async () => {
        if (libro) { // Verificar si product no es null
            dispatch(addProductModify(libro));
            const response = await fetch(`/products-delete/${libro.isbn}`, {
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
        <button className="shoppingcart-button-delete" onClick={handleAddProductDelete}>
            <img src={iconoBorrar} alt="Borrar libro" className="icono-basurero" />
        </button>
    )
}

export default ButtonProductDelete;