import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/_services/reporting.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  start = new Date();
  end = new Date();
  
  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
  }

  filter() {
    if (this.start === null) {
      this.start = new Date();
    }

    if (this.end === null) {
      this.end = new Date();
    }

    let dates:Date[] = [];
    dates.push(this.start);
    dates.push(this.end);

    this.reportingService.updateFilters(dates);
  }

}
