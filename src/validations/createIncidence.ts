export const validateCreateIncidence = (name: string, value: string, file?: File): string | undefined => {
    switch (name) {
        case 'subject':
            if (!value) {
                return 'Por favor, ingresa el subtítulo de la incidencia';
            }
            if (value.length < 5) {
                return 'El subtítulo debe tener al menos 5 caracteres';
            }
            if (/[<>]/.test(value)) {
                return 'El subtítulo no puede contener caracteres especiales como < o >';
            }
            break;
        case 'type':
            if (!value) {
                return 'Por favor, selecciona el tipo de incidencia';
            }
            break;
        case 'description':
            if (!value) {
                return 'Por favor, ingresa la descripción de la incidencia';
            }
            if (value.length < 10) {
                return 'La descripción debe tener al menos 10 caracteres';
            }
            if (/[<>]/.test(value)) {
                return 'La descripción no puede contener caracteres especiales como < o >';
            }
            break;
        case 'location':
            if (!value) {
                return 'Por favor, selecciona la locación de la incidencia';
            }
            break;
        case 'image':
            if (!file) {
                return 'Por favor, selecciona una imagen para la incidencia';
            }
            const allowedExtensions = /(jpg|jpeg|png|webp)$/i;
            if (!allowedExtensions.test(file.name)) {
                return 'Por favor, selecciona una imagen con una extensión válida (jpg, jpeg, png o webp)';
            }
            break;
        default:
            break;
    }
};