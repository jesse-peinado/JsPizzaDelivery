import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  clickEmployees() {
    this.router.navigateByUrl('/employees'); 
  }
  
  clickOrders() {
    this.router.navigateByUrl('/orders'); 
  }

  clickCustomers() {
    this.router.navigateByUrl('/customers'); 
  }

  clickReporting() {
    this.router.navigateByUrl('/reporting'); 
  }

}
