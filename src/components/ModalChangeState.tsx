import { Modal, Button } from 'react-bootstrap';
import { useAdminIncidenceStore } from '../store/adminIncidenceStore';

interface ModalChangeStateProps {
    show: boolean;
    handleClose: () => void;
    incidenceId: number;
}
const ModalChangeState: React.FC<ModalChangeStateProps> = ({ show, handleClose, incidenceId }) => {
    const { markIncidenceResolved } = useAdminIncidenceStore()
    const handleAcceptWithMarkResolved = () => {
        markIncidenceResolved(incidenceId);
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmación de cambios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Seguro que quieres marcar como resuelto este incidente? Este cambio no se podrá revertir.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleAcceptWithMarkResolved}>
                    Aceptar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalChangeState;