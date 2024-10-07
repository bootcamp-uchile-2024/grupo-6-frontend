import iconoMercadoPago from '../assets/images/logo-mercadopago29.png'
import iconoPayPal from '../assets/images/Paypal_2014_logo.png'
import iconoWebpay from '../assets/images/logo-webpay-plus-3-2.png'
import iconoX from '../assets/images/icono_x.png'
import iconoFacebook from '../assets/images/icono_facebook.png'
import iconoInstagram from '../assets/images/icono_instagram.png'
import '../styles/footer.css'

function Footer() {

    return (
        <footer id="footer">

            <div className="caja-footer">
                <p className="nombres-footer">Nosotros</p>
                <ul>
                    <li><a href="">Link 1</a></li>
                    <li><a href="">Link 2</a></li>
                    <li><a href="">Link 3</a></li>
                    <li><a href="">Link 4</a></li>
                </ul>
            </div>

            <div className="caja-footer">
                <p className="nombres-footer">Ayuda</p>
                <ul>
                    <li><a href="">Link 1</a></li>
                    <li><a href="">Link 2</a></li>
                    <li><a href="">Link 3</a></li>
                    <li><a href="">Link 4</a></li>
                </ul>
            </div>

            <div className="caja-footer">
                <p className="nombres-footer">Formas de pago</p>
                <div className="imagenes-pago">
                    <img src={iconoMercadoPago} alt="mercado pago"/>
                    <img src={iconoPayPal} alt="payPal"/>
                    <img src={iconoWebpay} alt="webPay"/>
                </div>
            </div>

            <div className="caja-footer">
                <p className="nombres-footer">Síguenos en redes sociales</p>
                <div className="imagenes-rrss">
                    <a href="https://x.com/i/flow/login"><img src={iconoX} alt="X"/></a>
                    <a href="https://www.instagram.com/"><img src={iconoInstagram} alt="Instagram"/></a>
                    <a href="https://www.facebook.com/login/?locale=es_LA"><img src={iconoFacebook} alt="Facebook"/></a>
                </div>
            </div>

            <div className="copyright">
                <p>Copyright © 2024 HexaStudio.</p>
            </div>
        </footer>
    );
};

export default Footer;