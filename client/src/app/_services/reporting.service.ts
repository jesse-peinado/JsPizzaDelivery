import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeCompensationReport } from '../_models/employeeCompensationReport';
import { EmployeeOrderReport } from '../_models/employeeOrderReport';
import { RevenueReport } from '../_models/revenuereport';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  baseUrl = environment.apiUrl;
  datesChanged = new Subject<Date[]>();

  constructor(private http: HttpClient) { 
  }

  getEmployeeCompensationReport(startDate: Date, endDate: Date): Observable<EmployeeCompensationReport[]> {
    return this.http.get<EmployeeCompensationReport[]>(this.baseUrl + 'Reporting/EmployeeCompensationReport?' + 'Start=' + startDate.toLocaleDateString() + '&End=' + endDate.toLocaleDateString());
  }

  getEmployeeOrderReport(startDate: Date, endDate: Date): Observable<EmployeeOrderReport[]> {
    return this.http.get<EmployeeOrderReport[]>(this.baseUrl + 'Reporting/EmployeeOrderReport?' + 'Start=' + startDate.toLocaleDateString() + '&End=' + endDate.toLocaleDateString());
  }

  getRevenueReport(startDate: Date, endDate: Date): Observable<RevenueReport[]> {
    return this.http.get<RevenueReport[]>(this.baseUrl + 'Reporting/RevenueReport?' + 'Start=' + startDate.toLocaleDateString() + '&End=' + endDate.toLocaleDateString());
  }

  updateFilters(dates: Date[]) {
    this.datesChanged.next(dates);
  }
}
