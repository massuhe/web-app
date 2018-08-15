import { IFilter } from './IFilter';

export interface IFilterGroup {
    or: boolean;
    filters: IFilter[];
}
