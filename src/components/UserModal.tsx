import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../store/authStore';
import { Link } from 'wouter';

function UserModal() {
    const [showModal, setShowModal] = useState(false);
    const { logout } = useAuthStore();

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleLogout = () => {
        logout();
        setShowModal(false); // Cerrar el modal después de cerrar sesión
    };
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return (
        <div>
            <Button variant="primary" onClick={handleShowModal} style={{ fontSize: '1.25rem' }}>
                <FontAwesomeIcon icon={faUser} />
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title >Información de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user.isAdmin === true && <p>Rol: Administrador</p>}
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                    <Link to="/">
                        <Button variant="danger" onClick={handleLogout}>
                            Cerrar sesión
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserModal;