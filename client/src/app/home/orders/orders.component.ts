import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumnsSearch: string[] = ['id', 'actions', 'pizzaType', 'pizzaSize', 'price', 'deliveryAddress', 'orderStatus', 'estimatedTime', 'dateTimeOrdered', 'phoneNumber', 'employeeName', 'tip', 'dateTimeDelivering', 'dateTimeDelivered'];
  orderList: Order[] = [];

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(result => {
      result.forEach(order => {
        order.dateTimeOrdered = new Date(order.dateTimeOrdered).toLocaleString();
        if (order.dateTimeDelivered === null) {
          order.dateTimeDelivered = '';
        } else {
          order.dateTimeDelivered = new Date(order.dateTimeDelivered).toLocaleString();
        }

        if (order.dateTimeDelivering === null) {
          order.dateTimeDelivering = ''
        } else {
          order.dateTimeDelivering = new Date(order.dateTimeDelivering).toLocaleString();
        }
      })
      this.orderList = result;
    })
  }

  addOrder() {
    this.router.navigate(['add'], {relativeTo:this.route}); 
  }

  editOrder(id: number) {
    this.router.navigate([id], {relativeTo:this.route}); 
  }

}
