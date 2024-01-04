import { useContext, useEffect } from "react";
import { axiosInstance } from "../../../services/axios.config";
import { ItemsContext, UPLOAD_ITEMS } from "../../../Context/ItemsContext";
import TableBs from "react-bootstrap/Table";
import ItemTable from "../ItemTable/ItemTable";

//ascnsan

const ShowProducts = () => {
  const { items, dispatch } = useContext(ItemsContext);

  useEffect(() => {
    axiosInstance
      .get("/")
      .then((r) => {
        if (r.status === 200) {
          dispatch({ type: UPLOAD_ITEMS, payload: r.data });
        } else {
          throw new Error(`[${r.status}] Error en la solicitud`);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Productos en sistema</h1>
      <div className="container mt-3">
        {items.length > 0 ? (
          <TableBs striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Productos</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Imagen</th>
                <th style={{ textAlign: "center" }}>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <ItemTable item={item} key={i} />

              ))}
            </tbody>
          </TableBs>
        ) : (
          <h2 style={{ textAlign: "center" }}>
            No hay productos en el sistema
          </h2>
        )}
      </div>
    </div>
  );
};
export default ShowProducts;
