import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/_models/customer';
import { CustomerService } from 'src/app/_services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumnsSearch: string[] = ['firstName', 'lastName', 'phoneNumber'];
  customerList: Customer[] = []

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(result => {
      this.customerList = result;
    })
  }

}
