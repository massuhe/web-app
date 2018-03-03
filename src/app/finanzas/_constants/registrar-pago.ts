export const ESTRUCTURA_REGISTRAR_PAGO = {
    importeTotal: '',
    importePaga: ''
};

export const MENSAJES_REGISTRAR_PAGO = {
    importeTotal: {
        required: 'El campo es requerido'
    },
    importePaga: {
        required: 'El campo es requerido',
        greaterThanZero: 'El dato debe ser mayor a cero',
        notNegative: 'debe-La cantidad a deber no puede ser negativa'
    }
};
