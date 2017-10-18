import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-scheduler-cell',
  templateUrl: './scheduler-cell.component.html',
  styleUrls: ['./scheduler-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerCellComponent implements OnInit {

  @Input() enabled;

  constructor() { }

  ngOnInit() {
  }

}
