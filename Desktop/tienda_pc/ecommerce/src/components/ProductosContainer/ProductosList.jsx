import Producto from "./Producto";

const ProductosList = ({productos}) => {
  return (
    <div className="container">
          {productos.map((producto) => (
              <Producto key={producto.id} producto={producto} />
            ))}
        </div>
  )
}

export default ProductosList
