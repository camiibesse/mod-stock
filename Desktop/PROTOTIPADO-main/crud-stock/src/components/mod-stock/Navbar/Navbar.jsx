import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbarbs from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <Navbarbs bg="dark" variant="dark">
        <Container fluid>
          <Navbarbs.Brand>Tienda</Navbarbs.Brand>
          <Nav className="nav-container justify-content-evenly" style={{width:'30%'}}>
            <Nav.Item>
              <Link to="/" style={{color:'#fff', textDecoration:'none'}}> Crear </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/listar" style={{color:'#fff', textDecoration:'none'}}> Listar </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbarbs>
  )
}

export default Navbar
