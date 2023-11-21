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
  getCategoryById(id: string){
    return this.http.get<ICategory>(this.categporyUrl + '/' + id)
  }
  deleteCategory (id: string): Observable<ICategory>{
    const url = `${this.categporyUrl}/${id}`;
    return this.http.delete<ICategory>(url);
  }
  createCategory(category:ICategory):Observable<ICategory>{ 
    return this.http.post<ICategory>(this.categporyUrl,category);
  }
  updateCategory(id: string, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.categporyUrl}/${id}`, category)
  }

}
