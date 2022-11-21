import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  pizzaSizes = ['Small', 'Medium', 'Large', 'X-Large'];
  pizzaTypeControl = new FormControl('', [Validators.required]);
  pizzaSizeControl = new FormControl('', [Validators.required]);
  priceControl = new FormControl('', [Validators.required]);
  deliveryAddressControl = new FormControl('', [Validators.required]);
  estimatedTimeControl = new FormControl('', [Validators.required]);
  firstNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]);
  lastNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]);
  phoneNumberControl = new FormControl('', [Validators.required, Validators.minLength(14)]);
  constructor(private router: Router, private orderService: OrderService ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.pizzaTypeControl.valid && this.pizzaSizeControl.valid && this.priceControl.valid && this.deliveryAddressControl.valid && this.estimatedTimeControl.valid && this.firstNameControl.valid && this.lastNameControl.valid && this.phoneNumberControl.valid) {
      if (this.phoneNumberControl.value.length === 15) {
        if (this.phoneNumberControl.value.indexOf('\t') >= 0) {
          let newPhoneNumber = this.phoneNumberControl.value;
          this.phoneNumberControl.setValue(newPhoneNumber.slice(1, newPhoneNumber.length));
        } else {
          let newPhoneNumber = this.phoneNumberControl.value;
          this.phoneNumberControl.setValue(newPhoneNumber.slice(0, -1));
        }
      }
      let order = new Order(this.pizzaTypeControl.value, this.pizzaSizeControl.value, Number(this.priceControl.value), this.deliveryAddressControl.value, 'Received', this.phoneNumberControl.value, this.firstNameControl.value, this.lastNameControl.value, Number(this.estimatedTimeControl.value));
      this.orderService.addOrder(order).subscribe({
        next: (order) => {
          console.log('Added Order');
          this.router.navigateByUrl('/orders');
        }
      }); 
    } 
  }

  cancel() {
    this.router.navigateByUrl('/orders');
  }

}
