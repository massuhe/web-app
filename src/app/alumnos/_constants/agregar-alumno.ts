export const ESTRUCTURA_AGREGAR_ALUMNO = {
    'nombre': '',
    'apellido': '',
    'domicilio': '',
    'email': '',
    'telefono': '',
    'tieneAntecDeportivos': '',
    'observaciones': '',
};

export const MENSAJES_AGREGAR_ALUMNO = {
    'nombre': {
        'required': 'El campo es requerido'
    },
    'apellido': {
        'required': 'El campo es requerido'
    },
    'domicilio': {
        'required': 'El campo es requerido'
    },
    'email': {
        'required': 'El campo es requerido',
        'email': 'El email no tiene un formato válido'
    },
    'telefono': {
        'required': 'El campo es requerido',
        'pattern': 'El campo debe ser númerico'
    },
    'tieneAntecDeportivos': {
        'required': 'El campo es requerido',
    },
    'observaciones': {
        'required': 'El campo es requerido',
    }
};
