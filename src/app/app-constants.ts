import {
  IMultiSelectTexts,
  IMultiSelectSettings
} from 'angular-2-dropdown-multiselect';

/* Meses del año */
export const MESES_ANIO = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

export const MINUTOS_LIMITES_CONFIRMACION = 60;
export const MULTISELECT_TEXTS: IMultiSelectTexts = {
  checkAll: 'Seleccionar todos',
  uncheckAll: 'Deseleccionar todos',
  checked: 'item seleccionado',
  checkedPlural: 'items seleccionados',
  searchPlaceholder: 'Buscar',
  searchEmptyResult: 'No se encontraron resultados...',
  searchNoRenderText: 'Escriba en el campo para ver resultados...',
  defaultTitle: 'Seleccione una o más',
  allSelected: 'Todos seleccionados'
};
export const MULTISELECT_SETTINGS: IMultiSelectSettings = {
  checkedStyle: 'checkboxes',
  buttonClasses: 'form-control contentFont font-weight-light',
  itemClasses: 'contentFont font-weight-light',
  containerClasses: 'w-100'
};

/* Mensajes del dialogo */
export const GENERIC_ERROR_MESSAGE = 'Se ha producido un error inesperado';
export const CONFIRM_MESSAGE = '#articulo# #entidad# #ser# #accion#. ¿Desea continuar?';
export const SUCCESS_MESSAGE = '#articulo# #entidad# #ser# #accion# correctamente';

/* Acciones del dialogo */
export const GUARDAR = {
  masculino: {
    singular: 'guardado',
    plural: 'guardados'
  },
  femenino: 'guardada'
};

export const ELIMINAR = {
  masculino: 'eliminado',
  femenino: 'eliminada'
};

export const ACTUALIZAR = {
  masculino: 'actualizado',
  femenino: 'actualizada'
};

export const CAMBIAR = {
  masculino: 'cambiado',
  femenino: 'cambiada'
};

export const CONFIRMAR = {
  masculino: 'confirmado',
  femenino: 'confirmada'
};

export const CANCELAR = {
  masculino: 'cancelado',
  femenino: 'cancelada'
};

export const SUSPENDER = {
  masculino: 'suspendidos',
  femenino: 'suspendidas'
};

export const HABILITAR = {
  masculino: 'habilitados',
  femenino: 'habilitadas'
};

export enum ENTIDADES {
  ACTIVIDAD = 'actividad',
  ALUMNO = 'alumno',
  CLASE = 'clase',
  CLASES = 'clases',
  ASISTENCIA = 'asistencia',
  MOVIMIENTOS = 'movimientos',
  PAGO = 'pago',
  ITEM = 'item de inventario',
  RUTINA = 'rutina',
  CAMBIOS = 'cambios',
  USUARIO = 'usuario',
  CONTRASENA = 'contraseña'
}
