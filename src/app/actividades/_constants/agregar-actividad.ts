export const ESTRUCTURA_AGREGAR_ACTIVIDAD = {
    'nombre': '',
    'duracion': undefined,
    'cantidadAlumnosPorClase': undefined
};

export const MENSAJES_AGREGAR_ACTIVIDAD = {
    'nombre': {
        'required': 'El campo es requerido.'
    },
    'duracion': {
        'required': 'El campo es requerido.',
        'pattern': 'El campo debe ser numérico.'
    },
    'cantidadAlumnosPorClase': {
        'required': 'El campo es requerido.',
        'pattern': 'El campo debe ser numérico.'
    }
};
