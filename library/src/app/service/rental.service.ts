import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRental } from '../model/rental.model';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private http: HttpClient) {}

  rentalUrl = 'http://localhost:3000/rentals';

  getRentalList(): Observable<IRental[]> {
    return this.http.get<IRental[]>(this.rentalUrl);
  }
  createRental(rental: IRental): Observable<IRental> {
    return this.http.post<IRental>(this.rentalUrl, rental);
  }
  deleteRental (id: string): Observable<IRental>{
    const url = `${this.rentalUrl}/${id}`;
    return this.http.delete<IRental>(url);
  }
  updateRental(id: string, rental: IRental): Observable<IRental> {
    return this.http.put<IRental>(`${this.rentalUrl}/${id}`, rental)
  }
  getRentalById(id: string){
    return this.http.get<IRental>(this.rentalUrl + '/' + id)
  }
}
