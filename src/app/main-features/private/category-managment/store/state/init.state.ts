import { ICategory } from '../../../../../shared/models/category.model';

export interface CategoryState {
    loading: boolean;
    entity: ICategory;
    loadingEntities: boolean;
    entities: ICategory[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;
    activePage: number;
}

export const initCategoryState: CategoryState = {
    loading: false,
    entity: {},
    loadingEntities: false,
    entities: [],
    totalElements: -1,
    totalPages: -1,
    errorMessage: '',
    activePage: 5,
};