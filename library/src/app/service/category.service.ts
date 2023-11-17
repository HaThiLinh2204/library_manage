import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { ICategory } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  categporyUrl = 'http://localhost:3000/categories';

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categporyUrl);
  }
//   getCategoryById(id: number): Observable<string | undefined> {
//     return this.getCategories().pipe(
//       map((categories) => {
//         const foundCategory = categories.find((category) => category.id === id);
//         return foundCategory ? foundCategory.name : undefined;
//       })
//     );
//   }
}
