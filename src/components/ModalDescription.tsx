import { Modal, Button } from 'react-bootstrap';

interface ModalDescriptionProps {
  description: string;
  handleClose: () => void;
  show: boolean;
}

const ModalDescription: React.FC<ModalDescriptionProps> = ({ description, handleClose, show }) => {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Descripción</Modal.Title>
        </Modal.Header>
        <Modal.Body>{description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default ModalDescription;