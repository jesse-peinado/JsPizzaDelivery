import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportingService } from 'src/app/_services/reporting.service';

@Component({
  selector: 'app-employee-orders',
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.css']
})
export class EmployeeOrdersComponent implements OnInit, OnDestroy {
  displayedColumnsSearch: string[] = ['id', 'employeeName', 'orderId', 'price', 'tip', 'completionTime', 'estimatedTime', 'differenceBetweenCompletionAndEstimated'];
  employeeList: any[] = [];
  dateSubscription: Subscription;

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
    //If the date filters change and user clicks filter button, update report
    this.dateSubscription = this.reportingService.datesChanged.subscribe(dates => {
      this.reportingService.getEmployeeOrderReport(dates[0], dates[1]).subscribe(result => {
        this.employeeList = result;
      })
    });

    //defaults start and end date to today's date
    this.reportingService.getEmployeeOrderReport(new Date(), new Date()).subscribe(result => {
      this.employeeList = result;
    })
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }

}
