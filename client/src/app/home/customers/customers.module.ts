import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from "@angular/common";
import { CustomersComponent } from "./customers.component";
import { CustomersRoutingModule } from "./customers-routing.module";

@NgModule({
    declarations: [
        CustomersComponent
    ],
    imports: [
        RouterModule,
        CustomersRoutingModule,
        MatTableModule,
        CommonModule
        
    ],
})
export class CustomersModule {

}