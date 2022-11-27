import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { EmployeesComponent } from "./employees.component";

const routes: Routes = [
    { 
        path: '',  
        children: [
         { path: '', component: EmployeesComponent, pathMatch: 'full'},
            { path:'add', component: AddEmployeeComponent},
            { path: ':id', component: EditEmployeeComponent },
        ]
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule {

}