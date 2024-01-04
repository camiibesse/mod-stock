import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/mod-stock/Navbar/Navbar";
import FormCreateProduct from "./components/mod-stock/Formulario/FormCreateProduct"
import ShowProducts from "./components/mod-stock/Navbar/ShowProducts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemsContext, ItemsReducer } from "./Context/ItemsContext";
import { useReducer } from "react";

function App() {
  const initialState = [];
  const [items, dispatch] = useReducer(ItemsReducer, initialState);
  return (
    <>
      <BrowserRouter>
        <ItemsContext.Provider value={{ items, dispatch }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<FormCreateProduct />} />
            <Route path="/listar" element={<ShowProducts />} />
          </Routes>
        </ItemsContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
