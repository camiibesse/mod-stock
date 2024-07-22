import { Link } from "react-router-dom";

const Producto = ({producto}) => {
  return (
    <div className="box">
              <figure className="img_box">
                <img src={producto.foto} alt={producto.nombre} />
              </figure>
              <div className="detail">
                <h2>{producto.nombre}</h2>
                <h3>
                  <b>Marca: </b>
                  {producto.marca}
                </h3>
                <p>
                  <b>Categoría: </b>
                  {producto.categoria}
                </p>
                <p>
                  <b>Detalles: </b>
                  {producto.detalles}
                </p>
                <p>
                  <b>Stock: </b>
                  {producto.stock}
                </p>
                <p>
                  <b style={{ color: "orange" }}>Envío: </b>
                  {producto.envio ? "Si" : "No"}
                </p>
                <h4>
                  <b className="precio">Precio: </b>${producto.precio}
                </h4>
              </div>
              <Link className="button" to={`/producto/${producto.id}`}>Ver más</Link>
              
              {/* <button>Agregar al carrito</button> */}
            </div>
  )
}

export default Producto
