import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'wouter';
import { useAuthStore } from '../store/authStore';
import { validateEmail, validatePassword } from '../validations/login';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const { login } = useAuthStore();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    let errorMessage: string | undefined = '';
    switch (name) {
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

    setActiveButton(Object.values(errors).every((error) => !error));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;
    if (!activeButton) {
      console.error('Error al ingresar: Campos inválidos');
      return;
    }
    try {
      await login(email, password);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      window.location.href = user.isAdmin ? '/admin-home' : '/resident-home';
    } catch (error) {
      console.error('Error al ingresar:', error);
      throw new Error('Error al iniciar sesión')
    }
  };
  return (
    <Container fluid className="login-template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <Col xs={12} md={6} lg={5} xl={4} xxl={3} className="p-5 rounded bg-white">
        <h1 className="text-center">Login</h1>
        <Form onSubmit={handleSubmit}>
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
            Ingresar
          </Button>
        </Form>
        <Row className="mt-3">
          <Col className="text-start">
            No tienes una cuenta aún? <Link href="/sign-up">Regístrate</Link>
          </Col>
        </Row>
      </Col>
    </Container>
  )
}

export default Login;