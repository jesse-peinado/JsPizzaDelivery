import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  addEmployee(model: Employee): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Employees/save', model);
  }

  editEmployee(id, model: Employee): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'Employees/' + id, model);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl + 'Employees');
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + 'Employees/' + id);
  }
}
