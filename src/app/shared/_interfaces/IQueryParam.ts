import { ISort } from './ISort';
import { IFilterGroup } from './IFilterGroup';

export interface IQueryParam {
    includes?: string[];
    sort?: ISort[];
    limit?: number;
    page?: number;
    filter_groups?: IFilterGroup[];
}
