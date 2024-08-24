import icono_mercadopago from '../assets/images/logo-mercadopago29.png'
import icono_paypal from '../assets/images/Paypal_2014_logo.png'
import icono_webpay from '../assets/images/logo-webpay-plus-3-2.png'
import icono_x from '../assets/images/icono_x.png'
import icono_facebook from '../assets/images/icono_facebook.png'
import icono_instagram from '../assets/images/icono_instagram.png'

import '../styles/estilos_home.css'

function Footer() {

    return (
        <footer id="Footer">

            <div className="cajaFooter paginasSelectas">
                <p className="nombresFooter">Nosotros</p>
                <ul>
                    <li><a href="">Link 1</a></li>
                    <li><a href="">Link 2</a></li>
                    <li><a href="">Link 3</a></li>
                    <li><a href="">Link 4</a></li>
                </ul>
            </div>

            <div className="cajaFooter ayuda">
                <p className="nombresFooter">Ayuda</p>
                <ul>
                    <li><a href="">Link 1</a></li>
                    <li><a href="">Link 2</a></li>
                    <li><a href="">Link 3</a></li>
                    <li><a href="">Link 4</a></li>
                </ul>
            </div>

            <div className="cajaFooter formasPago">
                <p className="nombresFooter">Formas de pago</p>
                <div className="imagenesPago">
                    <img src={icono_mercadopago} alt="mercadoPago"/>
                    <img src={icono_paypal} alt="payPal"/>
                    <img src={icono_webpay} alt="webPay"/>
                </div>
            </div>

            <div className="cajaFooter redesSociales">
                <p className="nombresFooter">Síguenos en redes sociales</p>
                <div className="imagenesRRSS">
                    <a href="https://x.com/i/flow/login"><img src={icono_x} alt="X"/></a>
                    <a href="https://www.instagram.com/"><img src={icono_instagram} alt="Instagram"/></a>
                    <a href="https://www.facebook.com/login/?locale=es_LA"><img src={icono_facebook} alt="Facebook"/></a>
                </div>
            </div>

            <div className="copyright">
                <p>Copyright © 2024 HexaStudio.</p>
            </div>
        </footer>
    )
}

export default Footer