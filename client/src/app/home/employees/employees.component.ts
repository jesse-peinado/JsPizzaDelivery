import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  displayedColumnsSearch: string[] = ['id', 'actions', 'firstName', 'lastName', 'salary', 'isCurrentEmployee'];
  employeeList: any[] = [];

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(result => {
      this.employeeList = result;
    })
  }

  addEmployee() {
    this.router.navigate(['add'], {relativeTo:this.route}); 
  }

  editEmployee(id: number) {
    this.router.navigate([id], {relativeTo:this.route}); 
  }

}
