import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/_models/employee';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  isCurrentEmployee: boolean = true;
  firstNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]);
  lastNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]);
  salaryControl = new FormControl('', [Validators.required]);

  constructor(private router: Router, private employeeService: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.employeeService.getEmployee(Number(this.route.snapshot.paramMap.get('id'))).subscribe(employee => {
      this.firstNameControl.setValue(employee.firstName);
      this.lastNameControl.setValue(employee.lastName);
      this.salaryControl.setValue(employee.salary.toString());
      this.isCurrentEmployee = employee.isCurrentEmployee;
    })
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.firstNameControl.valid && this.lastNameControl.valid && this.salaryControl.valid) {
      let employee = new Employee(this.firstNameControl.value, this.lastNameControl.value, Number(this.salaryControl.value), this.isCurrentEmployee);
      this.employeeService.editEmployee(Number(this.route.snapshot.paramMap.get('id')), employee).subscribe({
        next: (employee) => {
          console.log('Edited Employee');
          this.router.navigateByUrl('/employees');
        }
      }); 
    } 
  }

  cancel() {
    this.router.navigateByUrl('/employees');
  }

}
