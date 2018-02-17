import { CONFIRM_MESSAGE, SUCCESS_MESSAGE } from '../app-constants';

export default class AppMessages {

    public static confirm(entidad: string, accion: string): string {
        return CONFIRM_MESSAGE.replace('#entidad#', entidad).replace('#accion#', accion);
    }

    public static success(entidad: string, accion: string): string {
        return SUCCESS_MESSAGE.replace('#entidad#', entidad).replace('#accion#', accion);
    }

}
