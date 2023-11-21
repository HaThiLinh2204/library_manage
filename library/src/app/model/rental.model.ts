export interface IRental { 

    id: string; 
  
    bookId: string; 
  
    userName: string; 
  
    dueDate: Date;//ngày hẹn trả 
  
    returnDate?: Date;// ngày trả
  
    status: 'Đã trả' | 'Đang mượn'; 
  
    
  
  }  