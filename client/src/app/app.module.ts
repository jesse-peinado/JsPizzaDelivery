import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesComponent } from './home/employees/employees.component';
import { AddEmployeeComponent } from './home/employees/add-employee/add-employee.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditEmployeeComponent } from './home/employees/edit-employee/edit-employee.component';
import { CustomersComponent } from './home/customers/customers.component';
import { OrdersComponent } from './home/orders/orders.component';
import { AddOrderComponent } from './home/orders/add-order/add-order.component';
import { TwoDigitDecimalDirective } from './_directives/two-digit-decimal.directive';
import { PhoneNumberDirective } from './_directives/phone-number.directive';
import { EditOrderComponent } from './home/orders/edit-order/edit-order.component';
import { ReportingComponent } from './home/reporting/reporting.component';
import { EmployeeCompensationComponent } from './home/reporting/employee-compensation/employee-compensation.component';
import { EmployeeOrdersComponent } from './home/reporting/employee-orders/employee-orders.component';
import { RevenueComponent } from './home/reporting/revenue/revenue.component';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    CustomersComponent,
    OrdersComponent,
    AddOrderComponent,
    TwoDigitDecimalDirective,
    PhoneNumberDirective,
    EditOrderComponent,
    ReportingComponent,
    EmployeeCompensationComponent,
    EmployeeOrdersComponent,
    RevenueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableExporterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
