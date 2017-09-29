export const ESTRUCTURA_AGREGAR_ALUMNO = {
    'nombre': '',
    'apellido': '',
    'domicilio': '',
    'correoElectronico': '',
    'numeroDeTelefono': '',
    'antecedentesDeportivos': '',
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
    'correoElectronico': {
        'required': 'El campo es requerido',
        'email': ''
    },
    'numeroDeTelefono': {
        'required': 'El campo es requerido',
        'minlength': ''
    },
    'antecedentesDeportivos': {
        'required': 'El campo es requerido',
    },
    'observaciones': {
        'required': 'El campo es requerido',
    }
};
