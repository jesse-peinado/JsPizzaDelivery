import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  isCurrentEmployee: boolean;
  firstNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]);
  lastNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]);
  salaryControl = new FormControl('', [Validators.required]);

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.firstNameControl.valid && this.lastNameControl.valid && this.salaryControl.valid) {
      let employee = new Employee(this.firstNameControl.value, this.lastNameControl.value, Number(this.salaryControl.value), true);
      this.employeeService.addEmployee(employee).subscribe({
        next: (employee) => {
          console.log('Added Employee');
          this.router.navigateByUrl('/employees');
        }
      }); 
    } 
  }

  cancel() {
    this.router.navigateByUrl('/employees');
  }

}
