import { BsCurrencyDollar, BsHeadphones, BsPercent } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";

const Info = () => {
  return (
    <div className="about">
        <div className="container">
          <div className="box">
            <div className="icon">
              <FiTruck />
            </div>
            <div className="detail">
              <h3>Envío gratis</h3>
              <p>Orden superior a 15.000$</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
              <BsCurrencyDollar />
            </div>
            <div className="detail">
              <h3>Reembolso</h3>
              <p>Garantía de devolución de dinero</p>              
            </div>
          </div>
          <div className="box">
            <div className="icon">
            <BsPercent />
            </div>
            <div className="detail">
              <h3>Descuentos</h3>
              <p>En todas las compras</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">
            <BsHeadphones />
            </div>
            <div className="detail">
              <h3>Soporte al cliente</h3>
              <p>24 Horas</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Info
