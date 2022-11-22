import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { Order } from 'src/app/_models/order';
import { OrderUpdate } from 'src/app/_models/orderUpdate';
import { CustomerService } from 'src/app/_services/customer.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  employeeId = -1;
  pizzaSizes = ['Small', 'Medium', 'Large', 'X-Large'];
  orderStatuses = [{status: 'Received', disabled: false}, {status: 'Preparing', disabled: true}, {status: 'Baking', disabled: true}, {status: 'Delivering', disabled: true}, {status: 'Delivered', disabled: true}];
  employees: Employee[] = [];
  pizzaTypeControl = new FormControl({value: '', disabled: true}, [Validators.required]);
  pizzaSizeControl = new FormControl({value: '', disabled: true}, [Validators.required]);
  priceControl = new FormControl({value: '', disabled: true}, [Validators.required]);
  deliveryAddressControl = new FormControl({value: '', disabled: true}, [Validators.required]);
  estimatedTimeControl = new FormControl({value: '', disabled: true}, [Validators.required]);
  orderStatusControl = new FormControl('', [Validators.required]);
  firstNameCustomerControl = new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]);
  lastNameCustomerControl = new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]);
  employeeControl = new FormControl({value: '', disabled: true});
  phoneNumberControl = new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(14)]);
  tipControl = new FormControl({value: '', disabled: true});
  lastOrderStatus = '';

  constructor(private router: Router, private orderService: OrderService, private customerService: CustomerService, private employeeService: EmployeeService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrder(Number(this.route.snapshot.paramMap.get('id'))).subscribe(order => {
      this.pizzaTypeControl.setValue(order.pizzaType);
      this.pizzaSizeControl.setValue(order.pizzaSize);
      this.priceControl.setValue(order.price.toString());
      this.deliveryAddressControl.setValue(order.deliveryAddress);
      this.estimatedTimeControl.setValue(order.estimatedTime.toString());
      this.orderStatusControl.setValue(order.orderStatus);
      //set enabled or disabled on order status options
      this.setOrderStatusEnabled(order.orderStatus);
      this.phoneNumberControl.setValue(order.phoneNumber);
      this.employeeControl.setValue(order.employeeId?.toString());
      this.tipControl.setValue(order.tip?.toString());
      this.employeeControl.setValidators(this.orderStatusControl.value === 'Delivering' ? [Validators.required] : null);
      this.employeeControl.updateValueAndValidity();
      this.tipControl.setValidators(this.orderStatusControl.value === 'Delivered' ? [Validators.required] : null);
      this.tipControl.updateValueAndValidity();
      this.customerService.getCustomer(order.phoneNumber).subscribe(customer => {
        this.firstNameCustomerControl.setValue(customer.firstName);
        this.lastNameCustomerControl.setValue(customer.lastName);
      });
      this.loadEmployees(order);
    });
  }

  loadEmployees(order: Order) {
    this.employeeService.getEmployees().subscribe(employees => {
      //Filter out employees that are disabled
      this.employees = employees.filter(x=> x.isCurrentEmployee);
      if (this.orderStatusControl.value === 'Delivering' || this.orderStatusControl.value === 'Delivered') {
        this.loadEmployee(order.employeeId)
      }
    });
  }

  loadEmployee(employeeId?: number) {
    this.employeeService.getEmployee(employeeId).subscribe(employee => {
      this.employeeId = employee.id;
    });
  }

  setOrderStatusEnabled(orderStatus: string) {
    if(orderStatus === 'Received') {
      this.orderStatuses.find(x => x.status === 'Received').disabled = false;
      this.orderStatuses.find(x => x.status === 'Preparing').disabled = false;
    } else if(orderStatus === 'Preparing') {
      this.orderStatuses.find(x => x.status === 'Received').disabled = true;
      this.orderStatuses.find(x => x.status === 'Preparing').disabled = false;
      this.orderStatuses.find(x => x.status === 'Baking').disabled = false;
    } else if(orderStatus === 'Baking') {
      this.orderStatuses.find(x => x.status === 'Received').disabled = true;
      this.orderStatuses.find(x => x.status === 'Baking').disabled = false;
      this.orderStatuses.find(x => x.status === 'Delivering').disabled = false;
    } else if(orderStatus === 'Delivering') {
      this.orderStatuses.find(x => x.status === 'Received').disabled = true;
      this.orderStatuses.find(x => x.status === 'Delivering').disabled = false;
      this.orderStatuses.find(x => x.status === 'Delivered').disabled = false;
      this.employeeControl.enable();
      this.employeeControl.setValidators([Validators.required]);
      this.employeeControl.updateValueAndValidity();
    } else if (orderStatus === 'Delivered') {
      this.tipControl.enable();
      this.tipControl.setValidators([Validators.required]);
      this.tipControl.updateValueAndValidity();
    }
  }

  orderStatusChanged() {
    // When order status changes track to see if we can enable employee and/or tip control
    if (this.orderStatusControl.value === 'Delivering') {
      this.employeeControl.enable();
      this.employeeControl.setValidators([Validators.required]);
      this.employeeControl.updateValueAndValidity();
    } else {
      this.employeeControl.disable();
    }
    
    if (this.orderStatusControl.value === 'Delivered') {
      this.employeeControl.disable();
      this.employeeControl.setValidators([Validators.required]);
      this.employeeControl.updateValueAndValidity();
      this.tipControl.enable();
      this.tipControl.setValidators([Validators.required]);
      this.tipControl.updateValueAndValidity();
    } else {
      this.tipControl.disable();
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.orderStatusControl.valid && (this.employeeControl.valid || this.employeeControl.disabled) && (this.tipControl.valid || this.tipControl.disabled)) {
      let orderUpdate: OrderUpdate;
      if (this.orderStatusControl.value === 'Delivered') {
        //if order status is delivered we will make an order update with the tip, employee and passing true for pizza delivered and false for delivering
        orderUpdate = new OrderUpdate(this.orderStatusControl.value, true, false, Number(this.employeeControl.value), Number(this.tipControl.value));
      } else if (this.orderStatusControl.value === 'Delivering') {
        //if order status is delivering we will make an order update with the employee and passing true for pizza delivering and false for delivered
        orderUpdate = new OrderUpdate(this.orderStatusControl.value, false, true, Number(this.employeeControl.value));
      } else {
        //Everything else will just be passing true for pizza delivered and false for delivering
        orderUpdate = new OrderUpdate(this.orderStatusControl.value, false, false);
      }
      this.orderService.editOrder(Number(this.route.snapshot.paramMap.get('id')), orderUpdate).subscribe({
        next: (order) => {
          console.log('Edit Order');
          this.router.navigateByUrl('/orders');
        }
      }); 
    } 
  }

  cancel() {
    this.router.navigateByUrl('/orders');
  }

}
