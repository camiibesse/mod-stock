
import { FaTruckMoving } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <div className="free">
        <div className="icon">
          <FaTruckMoving />
        </div>
        <p>Envío gratis con la compra superior a 20.000$</p>
      </div>
      <div className="main_header">
        <div className="container">
          <div className="logo">
            <Link to="/">
            <img src="img/logo.jpg" alt="logo" />
            </Link>           
          </div>
          <div className="icon">
            <div className="account">
              <div className="user_icon">
                <CiUser />
              </div>
              <p>Bienvenido</p>
            </div>
            <div className="bag_icon">
              <Link to="/carrito" className="link">
                <IoBagCheckOutline />
                <span className="numerito">0</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="container">
          <div className="nav">
            <ul>
              <li>
                <Link className="link" to="/">Inicio</Link>
              </li>
              <li>
                <Link className="link" to="/productos">Productos</Link>
              </li>
              <li>
                <Link className="link" to="/nosotros">Nosotros</Link>
              </li>
              <li>
                <Link className="link" to="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
