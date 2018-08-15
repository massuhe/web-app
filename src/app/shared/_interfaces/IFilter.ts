import { FilterOperator } from '../_models/FilterOperator';

export interface IFilter {
    key: string;
    value: any; // usar 'null' o '' (empty string) para hacer referencia a NULL
    operator: FilterOperator;
    not: boolean;
}
