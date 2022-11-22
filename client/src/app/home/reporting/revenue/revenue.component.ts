import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportingService } from 'src/app/_services/reporting.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit, OnDestroy {
  displayedColumnsSearch: string[] = ['revenue', 'employeeCompensation', 'profit'];
  revenue: any[] = [];
  dateSubscription: Subscription;

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
    //If the date filters change and user clicks filter button, update report
    this.dateSubscription = this.reportingService.datesChanged.subscribe(dates => {
      this.reportingService.getRevenueReport(dates[0], dates[1]).subscribe(result => {
        this.revenue = result;
      })
    });

    //defaults start and end date to today's date
    this.reportingService.getRevenueReport(new Date(), new Date()).subscribe(result => {
      this.revenue = result;
    })
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }

}
