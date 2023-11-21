import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { IBook } from '../model/book.model';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}
  
  bookUrl = 'http://localhost:3000/books';

 
  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.bookUrl);
  }
  getBookById(id: string){
    return this.http.get<IBook>(this.bookUrl + '/' + id)
  }
  createbook(book:IBook):Observable<IBook>{ 
    return this.http.post<IBook>(this.bookUrl,book);
  }

  deleteBook (id: string): Observable<IBook>{
    const url = `${this.bookUrl}/${id}`;
    return this.http.delete<IBook>(url);
  }
  updateBook(id: string, book: IBook): Observable<IBook> {
    return this.http.put<IBook>(`${this.bookUrl}/${id}`, book)
  }
  getBooksByCategoryId(categoryId: string): Observable<IBook[]> {
    const url = `${this.bookUrl}?categoryId=${categoryId}`;
    return this.http.get<IBook[]>(url);
  }

  
}
