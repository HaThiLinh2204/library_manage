export interface ICategory {
  id: number;

  categoryName: string;
}

export interface ICategoryList {
  categories: ICategory[];

  selectedCategory: ICategory | null;

  // pagination: Pagination;
}
