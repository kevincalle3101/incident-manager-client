import { Modal, Button } from 'react-bootstrap';
import { useAdminIncidenceStore } from '../store/adminIncidenceStore';

interface ModalChangeStateProps {
    show: boolean;
    handleClose: () => void;
    incidenceId: number;
}
const ModalDeleteIncidence: React.FC<ModalChangeStateProps> = ({ show, handleClose, incidenceId }) => {
    const { deleteIncidence } = useAdminIncidenceStore()
    const handleAcceptDelete = () => {
        deleteIncidence(incidenceId);
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmación de eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Seguro que quieres eliminar esta incidencia? Este cambio es irreversible.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleAcceptDelete}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDeleteIncidence;