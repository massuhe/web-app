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
export const CONFIRM_MESSAGE = '#entidad# será #accion#. ¿Desea continuar?';
export const SUCCESS_MESSAGE = '#entidad# se ha #accion# correctamente';

/* Acciones del dialogo */
export const GUARDAR = 'guardado';
export const ELIMINAR = 'eliminado';
export const ACTUALIZAR = 'actualizado';
