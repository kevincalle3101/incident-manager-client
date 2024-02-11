export const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return 'Por favor, ingresa tu correo electrónico';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'El correo electrónico no tiene un formato válido';
    }
  };
  
  export const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return 'Por favor, ingresa tu contraseña';
    }
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
  };