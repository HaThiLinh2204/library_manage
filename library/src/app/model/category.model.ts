interface ICategory { 

    id: string; 
  
    name: string; 
  
  } 
  
  interface ICategoryList{ 
  
    categories: ICategory[]; 
  
    selectedCategory: ICategory | null; 
  
   // pagination: Pagination; 
  
    
  
  } 