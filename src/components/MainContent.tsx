import iconoImagen from '../assets/images/icono_imagen.png'
import '../styles/main_content.css'

function MainContent() {

    return (
        <main>
            <div className="caja-main">
                <h2 className="titulo-main">Quienes somos</h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."</p>
            </div>
            <div className="caja-main caja-main-2">
                <img src={iconoImagen} alt="imagen" />
            </div>
        </main>
    );
};

export default MainContent;