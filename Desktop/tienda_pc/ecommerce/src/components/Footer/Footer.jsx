import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="about">
            <div className="logo">
              <img src="./img/logo.jpg" alt="Logo" />
            </div>
            <div className="detail">
              <p>
                Especialistas del mundo del PC Gamer. Dedicados a la venta de
                hardware.
              </p>
              <div className="icon">
                <ul>
                  <li>
                    <FaFacebookF />
                  </li>
                  <li>
                    <FaInstagram />
                  </li>
                  <li>
                    <FaXTwitter />
                  </li>
                  <li>
                    <FaYoutube />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="account">
            <h3>Nuestras cuentas</h3>
            <ul>
              <li>Cuentas</li>
              <li>Ordenes</li>
              <li>Carrito</li>
              <li>Envío</li>
              <li>Volver</li>
            </ul>
          </div>
          <div className="page">
            <h3>Páginas</h3>
            <ul>
              <li>Inicio</li>
              <li>Productos</li>
              <li>Contacto</li>
              <li>Terminos y condiciones</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
