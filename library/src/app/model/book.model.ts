
interface IBook { 

    id: string; 
  
    name: string; 
  
    categoryId: string; 
  
    quantity: number; 
  
    initialStock: number; 
  
    remainingStock: number; 
  
  } 
  
  interface IBookList{ 
  
    books: IBook[]; 
  
    selectedBook: IBook | null; 
  
    isBorrowDialogOpen: boolean; 
  
    isDeleteDialogOpen: boolean; 
  
    //pagination: Pagination; 
  
    search: ISearchBook; 
  
  } 
  
  interface ISearchBook { 
  
    searchTerm: string; 
  
    searchByTitle: string; 
  
    //searchByCategory: categoryId; 
  
  } 