export const validateName = (name: string): string | undefined => {
    if (!name) {
      return 'Por favor, ingresa tu nombre';
    }
      const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    if (!nameRegex.test(name)) {
      return 'El nombre contiene caracteres no válidos';
    }
      if (name.length < 3) {
      return 'El nombre debe tener al menos 3 caracteres';
    }
  };
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
    if(!password){
      return 'Por favor, ingresa tu contraseña';
    }
    if(password.length < 6){
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if(!/(?=.*[a-z])/.test(password)){
      return 'La contraseña debe contener al menos una letra minúscula';
    }
  
    if(!/(?=.*[A-Z])/.test(password)){
      return 'La contraseña debe contener al menos una letra mayúscula';
    }
    if(!/(?=.*\d)/.test(password)){
      return 'La contraseña debe contener al menos un número';
    }
  };