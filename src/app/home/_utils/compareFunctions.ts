import { Novedad } from '../../novedades/_models/Novedad';

export const compareByPrioridad = (novedad1: Novedad, novedad2: Novedad): number => {
  const compareValue = Number(novedad2.esPrioritaria) - Number(novedad1.esPrioritaria);
  if (compareValue === 0) {
    return compareByFechaCreacion(novedad1, novedad2);
  }
  return compareValue;
};

export const compareByFechaCreacion = (novedad1: Novedad, novedad2: Novedad, desc = true) => {
  const factor = desc ? -1 : 1;
  if (novedad1.fechaCreacion > novedad2.fechaCreacion) {
    return 1 * factor;
  }
  if (novedad1.fechaCreacion < novedad2.fechaCreacion) {
    return -1 * factor;
  }
  return 0;
};
