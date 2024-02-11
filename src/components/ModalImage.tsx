import { Modal, Button } from 'react-bootstrap';

interface ModalImageProps {
  imageUrl: string;
  handleClose: () => void;
  show: boolean;
}

const ModalImage: React.FC<ModalImageProps> = ({ imageUrl, handleClose, show }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={imageUrl} alt="Imagen" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalImage;