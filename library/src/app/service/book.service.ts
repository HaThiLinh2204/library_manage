import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
}
