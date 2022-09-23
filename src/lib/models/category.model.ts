import { ISubCategory } from "./sub-category.model";

export interface ICategory {
  id?: number;
  titleAr?: string | null;
  titleFr?: string | null;
  titleEn?: string | null;
  subCategories?: ISubCategory[] | null;
}

export const defaultValue: Readonly<ICategory> = {};
