export interface ICategory {
  id: number;

  name: string;
}

export interface ICategoryList {
  categories: ICategory[];

  selectedCategory: ICategory | null;

  // pagination: Pagination;
}
