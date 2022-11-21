import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { OrderUpdate } from '../_models/orderUpdate';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  addOrder(model: Order): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Orders/save', model);
  }

  editOrder(id, model: OrderUpdate): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'Orders/' + id, model);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'Orders');
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + 'Orders/' + id);
  }
}
