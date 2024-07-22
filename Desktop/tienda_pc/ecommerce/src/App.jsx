import './App.css';
import ProductosContainer from './components/ProductosContainer/ProductosContainer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';


function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<ProductosContainer />} />
        {/* <Route path="/carrito" element={<Carrito />} /> */}
      </Routes>
    <Footer />
    </BrowserRouter>
    
    </>
  );
}

export default App;
