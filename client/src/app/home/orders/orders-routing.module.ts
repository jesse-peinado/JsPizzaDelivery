import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddOrderComponent } from "./add-order/add-order.component";
import { EditOrderComponent } from "./edit-order/edit-order.component";
import { OrdersComponent } from "./orders.component";

const routes: Routes = [
    { 
        path: '',  
        children: [
         { path: '', component: OrdersComponent, pathMatch: 'full'},
            { path:'add', component: AddOrderComponent},
            { path: ':id', component: EditOrderComponent },
        ]
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {

}