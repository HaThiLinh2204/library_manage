export interface IBook {
  id: number;

  name: string;

  categoryId: number;

  quantity: number;

  remainingStock: number;
}

export interface IBookList {
  books: IBook[];

  selectedBook: IBook | null;

  isBorrowDialogOpen: boolean;

  isDeleteDialogOpen: boolean;

  //pagination: Pagination;

  search: ISearchBook;
}

export interface ISearchBook {
  searchTerm: string;

  searchByTitle: string;

  //searchByCategory: categoryId;
}
