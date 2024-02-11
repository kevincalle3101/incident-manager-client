import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'wouter';
import { useAuthStore } from '../store/authStore';
import { validateName, validateEmail, validatePassword } from '../validations/signUp';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [activeButton, setActiveButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuthStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    let errorMessage: string | undefined = '';
    switch (name) {
      case 'name':
        errorMessage = validateName(value);
        break;
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
    setActiveButton(errorMessage ? false : true);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, password } = formData;
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    if (nameError || emailError || passwordError) {
      console.error('Error al registrar: Campos inválidos');
      return;
    }
    try {
      await register(name, email, password);
      Swal.fire({
        toast: true,
        icon: "success",
        title: "Te registraste correctamente",
        text: "Inicia sesión nuevamente",
        timer: 1200,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top"
      }).then(() => {
        window.location.href = '/';
      });
    } catch (error) {
      console.error('Error al registrar:', error);
      Swal.fire({
        toast: true,
        icon: "warning",
        title: "Ups!, hubo un error al registrarte",
        text: "Email ya registrado",
        timer: 1200,
        timerProgressBar: true,
        showConfirmButton: false,
        position: "top",
      })
    }
  };

  return (
    <Container fluid className="login-template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <Col xs={12} md={6} lg={5} xl={4} xxl={3} className="p-5 rounded bg-white">
        <h1 className="text-center">Regístrate</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Coloque su nombre" name="name" value={formData.name} onChange={handleChange} />
            <Form.Text className="text-danger">{errors.name}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Coloque su email" name="email" value={formData.email} onChange={handleChange} />
            <Form.Text className="text-danger">{errors.email}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <div className="input-group">
              <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Coloque su contraseña" name="password" value={formData.password} onChange={handleChange} />
              <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-dark" />
              </Button>
            </div>
            <Form.Text className="text-danger">{errors.password}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Recuerdame" />
          </Form.Group>
          <Button variant="primary" type="submit" className="d-grid" disabled={!activeButton}>
            Registrar
          </Button>
        </Form>
        <Row className="mt-3">
          <Col className="text-start">
            Ya tienes una cuenta?<Link href="/" className='ms-1'>Ingresa</Link>
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default SignUp;