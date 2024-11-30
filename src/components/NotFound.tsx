import imagen404NotFound from "../assets/images/imagen_404_Not_Found.png"
import '../styles/not_found.css'

export const NotFound = () => {
    return (
        <div className="caja-not-found">
            <img src={imagen404NotFound} alt="Página no encontrada" />
            <p>Lo sentimos, esta página aún no está disponible</p>
            <p>Redirigiendo a página principal...</p>
        </div>
    );
};