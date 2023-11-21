export interface ICategory {
  id: string;

  categoryName: string;
}

export interface ICategoryList {
  categories: ICategory[];

  selectedCategory: ICategory | null;

  // pagination: Pagination;
}
