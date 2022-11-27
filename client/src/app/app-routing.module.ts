import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: '', component: HomeComponent},
  { path: 'employees', loadChildren: () => import('./home/employees/employees.module').then(m => m.EmployeesModule)},
  { path: 'customers', loadChildren: () => import('./home/customers/customers.module').then(m => m.CustomersModule)},
  { path: 'orders', loadChildren: () => import('./home/orders/orders.module').then(m => m.OrdersModule)},
  { path: 'reporting', loadChildren: () => import('./home/reporting/reporting.module').then(m => m.ReportingModule)}
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
