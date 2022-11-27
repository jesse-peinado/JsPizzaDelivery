import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReportingComponent } from './reporting.component';
import { EmployeeCompensationComponent } from './employee-compensation/employee-compensation.component';
import { EmployeeOrdersComponent } from './employee-orders/employee-orders.component';
import { RevenueComponent } from './revenue/revenue.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReportingRoutingModule } from "./reporting-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ReportingComponent,
        EmployeeCompensationComponent,
        EmployeeOrdersComponent,
        RevenueComponent
    ],
    imports: [
        RouterModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReportingRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatTableExporterModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule
        
    ],
})
export class ReportingModule {

}