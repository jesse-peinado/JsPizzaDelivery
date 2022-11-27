import { NgModule } from "@angular/core";
import { AddOrderComponent } from "./add-order/add-order.component";
import { EditOrderComponent } from "./edit-order/edit-order.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders.component";
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "src/app/_directives/directives.module";

@NgModule({
    declarations: [
        OrdersComponent,
        AddOrderComponent,
        EditOrderComponent,
    ],
    imports: [
        OrdersRoutingModule,
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
export class OrdersModule {

}