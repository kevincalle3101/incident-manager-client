import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useUserIncidenceStore } from '../store/userIncidenceStore';

interface Props {
  id: number;
  show: boolean;
  handleClose: () => void;
}

const CreateUserComment: React.FC<Props> = ({ id, show, handleClose }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { postCommentToIncidence } = useUserIncidenceStore();

  const handleCommentSubmit = async () => {
    try {
      if (content.length < 4) {
        setError('El comentario tiene que tener al menos 4 caracteres');
        return;
      }
      const regex = /<|>/;
      if (regex.test(content)) {
        setError('El comentario no puede contener los caracteres < o >');
        return;
      }
      await postCommentToIncidence(id, content);
      setContent('');
      setError(null);
      handleClose();
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setContent(inputValue);
    const regex = /<|>/;
    if (inputValue.length < 4) {
      setError('El comentario tiene que tener al menos 4 caracteres');
    } else if (regex.test(inputValue)) {
      setError('El comentario no puede contener los caracteres < o >');
    } else {
      setError(null);
    }
  };

  const isSubmitDisabled = !!error || content.trim().length === 0;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar comentario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="commentForm">
            <Form.Label>Cuerpo del comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={handleChange}
              isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleCommentSubmit} disabled={isSubmitDisabled}>
          Enviar comentario
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserComment;