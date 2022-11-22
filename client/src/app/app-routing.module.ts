import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './home/customers/customers.component';
import { AddEmployeeComponent } from './home/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './home/employees/edit-employee/edit-employee.component';
import { EmployeesComponent } from './home/employees/employees.component';
import { HomeComponent } from './home/home.component';
import { AddOrderComponent } from './home/orders/add-order/add-order.component';
import { EditOrderComponent } from './home/orders/edit-order/edit-order.component';
import { OrdersComponent } from './home/orders/orders.component';
import { ReportingComponent } from './home/reporting/reporting.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: HomeComponent},
  { path: 'employees', component: EmployeesComponent},
  { path: 'employees', 
    children: [
      { path:'add', component: AddEmployeeComponent},
      { path: ':id', component: EditEmployeeComponent },
    ]
  },
  { path: 'customers', component: CustomersComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'orders', 
    children: [
      { path:'add', component: AddOrderComponent},
      { path: ':id', component: EditOrderComponent },
    ]
  },
  { path: 'reporting', component: ReportingComponent},
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
