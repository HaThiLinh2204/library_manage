export interface IRental {
  id: string;

  bookId: string;

  userName: string;

  dueDate: Date; //ngày hẹn trả

  returnDate?: Date; // ngày trả

  status: 'Đã trả' | 'Đang mượn';
}
export interface IRentalList extends IRental {
  name: string;
  categoryName: string;
  bookId: string;
}