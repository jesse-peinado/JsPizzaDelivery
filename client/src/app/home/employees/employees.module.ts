import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { EmployeesComponent } from "./employees.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";
import { EmployeesRoutingModule } from "./employees-routing.module";
import { DirectivesModule } from "src/app/_directives/directives.module";

@NgModule({
    declarations: [
        EmployeesComponent,
        AddEmployeeComponent,
        EditEmployeeComponent
    ],
    imports: [
        EmployeesRoutingModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatCheckboxModule,
        MatSelectModule,
        MatIconModule,
        CommonModule,
        DirectivesModule
    ]
})
export class EmployeesModule {

}