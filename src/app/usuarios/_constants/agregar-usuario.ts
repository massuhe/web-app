export const ESTRUCTURA_AGREGAR_USUARIO = {
    'nombre': '',
    'apellido': '',
    'domicilio': '',
    'email': '',
    'telefono': ''
};

export const MENSAJES_AGREGAR_USUARIO = {
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
    'passwordGroup': {
        'matchFields': 'Las contraseñas no coinciden'
    }
};
