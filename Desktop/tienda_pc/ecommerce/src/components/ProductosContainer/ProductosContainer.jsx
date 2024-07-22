import { useState, useEffect } from 'react'
import { getProducts } from "../Servicios/productos";
import ProductosList from './ProductosList';
import './ProductosContainer.css'


const ProductosContainer = () => {
    const [productos, setProductos] = useState([]);
    // const [filter, setFilter] = useState("");

    // const handleFilterChange = (event) => {
    //   const inputValue = event.target.value;
    //   setFilter(inputValue);
    // };

    useEffect(() => {
        async function pedir() {
          const productos = await getProducts();
          setProductos(productos);
        }
        pedir();
      }, []);

//     const productosFiltrados = productos.filter((producto) =>
//     producto.nombre.toLowerCase().includes(filter.toLowerCase()) ||
//     producto.categoria.toLowerCase().includes(filter.toLowerCase()) ||
//     producto.marca.toLowerCase().includes(filter.toLowerCase())
//   );
    
  return (
    <div className="product">
        <h1>Nuestros productos</h1>
        {/* <div className="search_box">
          <input
            type="text"
            value={filter}
            placeholder="Busca tu producto..."
            onChange={handleFilterChange}
          />
          <button>Buscar</button>
        </div> */}
        <ProductosList productos={productos} />
      </div>
  )
}

export default ProductosContainer
