import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../_models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'Customers');
  }

  getCustomer(phoneNumber: string): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl + 'Customers/' + phoneNumber);
  }
}
