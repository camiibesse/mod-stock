import Home from "../pages/Home";
import ShowProducts from "../pages/ShowProducts";
import { Routes, Route } from "react-router-dom";
import CreateProduct from "../pages/CreateProduct";



const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/show" element={<ShowProducts />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
