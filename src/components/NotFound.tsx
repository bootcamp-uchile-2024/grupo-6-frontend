import imagen_404_Not_Found from "../assets/images/imagen_404_Not_Found.png"

export const NotFound = () => {
    return (
        <div className="caja-not-found">
            <img src={imagen_404_Not_Found} alt="" />
            <p>Lo sentimos, esta página aún no está disponible</p>
            <p>Redirigiendo a página principal...</p>
        </div>
    )
}