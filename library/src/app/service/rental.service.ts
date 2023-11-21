import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IRental } from "../model/rental.model";

@Injectable({
    providedIn: 'root',
})
export class RentalService {
    constructor(private http: HttpClient){}

    rentalUrl = 'http://localhost:3000/rentals';

    getRentalList(): Observable<IRental[]>{
        return this.http.get<IRental[]>(this.rentalUrl);

    }
}