import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'wouter';
import UserModal from './UserModal';

const NavBar = () => {
  const [location] = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <Navbar variant={"dark"} expand="lg" className='py-2 px-4 bg-primary' >
        <Navbar.Brand href="#" className='fs-3 m-0' style={{ fontWeight: 'bold' }}>Incidencias App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 fs-5" style={{ maxHeight: '140px' }} navbarScroll>
            {!user.isAdmin && (
              <Link href="/resident-home" 
                className={location === "/resident-home" ? "nav-link active" : "nav-link"} 
                style={location === "/resident-home" ? { borderBottom: '2px solid #009f9a' } : {}}>
                Inicio
              </Link>
            )}
            {user.isAdmin && (
              <Link href="/admin-home" 
                className={location === "/admin-home" ? "nav-link active" : "nav-link"} 
                style={location === "/admin-home" ? { borderBottom: '3px solid #fff' } : {}}>
                Incidencias
              </Link>
            )}
            {!user.isAdmin && (
            <Link href="/create-incidence" 
              className={location === "/create-incidence" ? "nav-link active" : "nav-link"} 
              style={location === "/create-incidence" ? { borderBottom: '3px solid #fff' } : {}}>
              Nueva Incidencia
            </Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <UserModal />
      </Navbar>
    </div>
  );
}

export default NavBar;