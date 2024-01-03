import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbarbs from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <Navbarbs bg="dark" variant="dark">
        <Container fluid>
          <Navbarbs.Brand href="#home">Tienda</Navbarbs.Brand>
          <Nav className="nav-container justify-content-evenly">
            <Nav.Item>
              <Link to="/" style={{color:'#fff', textDecoration:'none'}}> Home </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/create" style={{color:'#fff', textDecoration:'none'}}> Crear </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/show" style={{color:'#fff', textDecoration:'none'}}> Listar </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbarbs>
  )
}

export default Navbar
