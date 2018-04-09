import { CONFIRM_MESSAGE, SUCCESS_MESSAGE } from '../app-constants';

export default class AppMessages {

    public static confirm(entidad: string, accion: string, plural = false): string {
        let m = CONFIRM_MESSAGE.replace('#entidad#', entidad).replace('#accion#', accion);
        m = plural ? m.replace('#n#', 'n') : m.replace('#n#', '');
        return m;
    }

    public static success(entidad: string, accion: string, plural = false): string {
        let m = SUCCESS_MESSAGE.replace('#entidad#', entidad).replace('#accion#', accion);
        m = plural ? m.replace('#n#', 'n') : m.replace('#n#', '');
        return m;
    }

}
