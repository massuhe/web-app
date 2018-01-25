import { IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';

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
