import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-scheduler-hours',
  templateUrl: './scheduler-hours.component.html',
  styleUrls: ['./scheduler-hours.component.scss']
})
export class SchedulerHoursComponent implements OnInit {

  @Input() rows;

  constructor() { }

  ngOnInit() {
  }

}
