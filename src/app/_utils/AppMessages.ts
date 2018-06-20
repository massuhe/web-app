import { CONFIRM_MESSAGE, SUCCESS_MESSAGE, GENERIC_ERROR_MESSAGE } from '../app-constants';

export default class AppMessages {

    private static estructura = {
        '#articulo#': {
            'singular': {
                'masculino': 'El',
                'femenino': 'La'
            },
            'plural': {
                'masculino': 'Los',
                'femenino': 'Las'
            }
        },
        '#ser#': {
            'singular': {
                'futuro': 'será',
                'pasado': 'ha sido'
            },
            'plural': {
                'futuro': 'serán',
                'pasado': 'han sido'
            }
        }
    };

    public static confirm(entidad: string, accion: any, singular = true, masculino = true, futuro = true): string {
        return this.parse(CONFIRM_MESSAGE, {entidad, accion}, {singular, masculino, futuro});
    }

    public static success(entidad: string, accion: any, singular = true, masculino = true, futuro = false): string {
        return this.parse(SUCCESS_MESSAGE, {entidad, accion}, {singular, masculino, futuro});
    }

    public static error(errorObj: any): string {
        return errorObj.error ?
            (errorObj.error.clientMessage || GENERIC_ERROR_MESSAGE)
            : GENERIC_ERROR_MESSAGE;
    }

    private static parse(message: string, directReplace, estructuraReplace): string {
        const keys = message.match(/#(.*?)#/g);
        const estructuraOptions = this.parseEstructuraReplace(estructuraReplace);
        const finalMessage = keys.reduce(((currentMessage, actualKey) => {
            const possibleOption = actualKey.substr(1, actualKey.length - 2);
            if (directReplace[possibleOption]) {
                return this.searchAndReplace(currentMessage, directReplace[possibleOption], actualKey, estructuraOptions);
            }
            return this.searchAndReplace(currentMessage, this.estructura, actualKey, estructuraOptions);
        }), message);
        return finalMessage;
    }

    private static searchAndReplace(message: string, estructuraToSearch: any, key: string, estructuraOptions) {
        let coso = estructuraToSearch[key] || estructuraToSearch;
        while (coso instanceof Object) {
            const nextKey = estructuraOptions.find(e => !!coso[e]);
            coso = coso[nextKey];
        }
        return message.replace(key, coso);
    }

    private static parseEstructuraReplace(estructuraReplace): string[] {
        const response = [];
        response.push(estructuraReplace.singular ? 'singular' : 'plural');
        response.push(estructuraReplace.masculino ? 'masculino' : 'femenino');
        response.push(estructuraReplace.futuro ? 'futuro' : 'pasado');
        return response;
    }

}
