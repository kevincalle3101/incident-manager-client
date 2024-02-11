import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { validateCreateIncidence } from '../../validations/createIncidence';

interface FormData {
  subject: string;
  type: string;
  description: string;
  location: string;
  image: File | null;
}
interface FormErrors {
  subject: string;
  type: string;
  description: string;
  location: string;
  image: string;
}
const CreateIncidence = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState<FormData>({
    subject: '',
    type: '',
    description: '',
    location: '',
    image: null,
  });
  const [errors, setErrors] = useState<FormErrors>({
    subject: '',
    type: '',
    description: '',
    location: '',
    image: ''
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateCreateIncidence(name, value),
    }))
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }

    if (file && errors.image === null) {
      setErrors({
        ...errors,
        image: "no se ha proveído una imagen",
      });
    }

    if (Object.values(errors).every((error) => error !== "") || !file) {
      setSubmitButtonDisabled(true);
    } else {
      setSubmitButtonDisabled(false);
    }
  };
  const SERVER_URL = import.meta.env.URL_SERVIDOR;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { 'x-access-token': token };
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('subject', formData.subject);
        formDataToSend.append('type', formData.type);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('location', JSON.stringify(formData.location));
        formDataToSend.append('image', formData.image || '');

        const response = await axios.post(`${SERVER_URL}/incidence`, formDataToSend, {
          headers,
        });
        if (response.status === 201) {
          Swal.fire({
            toast: true,
            icon: "success",
            title: "La incidencia se ha creado correctamente",
            text: "Se le ha notificado al administrador",
            timer: 1200,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top"
          })
          setFormData({
            subject: '',
            type: '',
            description: '',
            location: '',
            image: null,
          });
          setImagePreview('');
          setErrors({
            subject: '',
            type: '',
            description: '',
            location: '',
            image: '',
          });
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          icon: "warning",
          title: "Ups!, hubo un error al crear la incidencia",
          text: "Por favor, intenta de nuevo",
          timer: 1200,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top",
        })
      }
  };

  return (
    <Container>
      <h2 className='fs-1 pt-4 text-primary' style={{ fontWeight: 'bold' }}>Crear Incidencia</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="subject" style={{ marginTop: '35px' }}>
          <Form.Label>Subtítulo</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-danger">{errors.subject}</Form.Text>
        </Form.Group>

        <Form.Group controlId="type" style={{ marginTop: '35px' }}>
          <Form.Label>Tipo de Incidencia</Form.Label>
          <Form.Control
            as="select"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar tipo...</option>
            <option value="observaciones">Observación</option>
            <option value="quejas">Quejas</option>
            <option value="urgente">Urgente</option>
          </Form.Control>
          <Form.Text className="text-danger">{errors.type}</Form.Text>
        </Form.Group>

        <Form.Group controlId="description" style={{ marginTop: '35px' }}>
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-danger">{errors.description}</Form.Text>
        </Form.Group>

        <Form.Group style={{ marginTop: '35px' }}>
          <Form.Label>Locación</Form.Label>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                label="Piso 1"
                checked={formData.location === 'Piso 1'}
                onChange={() => setFormData({ ...formData, location: 'Piso 1' })}
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                label="Piso 2"
                checked={formData.location === 'Piso 2'}
                onChange={() => setFormData({ ...formData, location: 'Piso 2' })}
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                label="Piso 3"
                checked={formData.location === 'Piso 3'}
                onChange={() => setFormData({ ...formData, location: 'Piso 3' })}
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                label="Piso 4"
                checked={formData.location === 'Piso 4'}
                onChange={() => setFormData({ ...formData, location: 'Piso 4' })}
              />
            </Col>
          </Row>
          <Form.Text className="text-danger">{errors.location}</Form.Text>
        </Form.Group>
        <Form.Group controlId="image" style={{ marginTop: '35px' }}>
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview"
            style={{ marginTop: '10px', maxWidth: '100%', height: 'auto', maxHeight: '250px' }} />}
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: '35px', marginBottom: '15px' }} disabled={submitButtonDisabled}>
          Crear Incidencia
        </Button>
      </Form>
    </Container>
  );
};

export default CreateIncidence;