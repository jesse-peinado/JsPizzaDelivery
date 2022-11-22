import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportingService } from 'src/app/_services/reporting.service';

@Component({
  selector: 'app-employee-compensation',
  templateUrl: './employee-compensation.component.html',
  styleUrls: ['./employee-compensation.component.css']
})
export class EmployeeCompensationComponent implements OnInit, OnDestroy {
  displayedColumnsSearch: string[] = ['id', 'employeeName', 'hoursWorked', 'totalSalaryPaid', 'totalTip', 'totalPaid', 'orderCount'];
  employeeList: any[] = [];
  dateSubscription: Subscription;

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
    this.dateSubscription = this.reportingService.datesChanged.subscribe(dates => {
      this.reportingService.getEmployeeCompensationReport(dates[0], dates[1]).subscribe(result => {
        this.employeeList = result;
      })
    });

    this.reportingService.getEmployeeCompensationReport(new Date(), new Date()).subscribe(result => {
      this.employeeList = result;
    })
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }

}
