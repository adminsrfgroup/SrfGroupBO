export interface PageCommon<T> {
    content: T[];
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
}

export interface Pagination{
  page: number;
  size: number;
}
