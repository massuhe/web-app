import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { IIcono } from '../_interfaces/IIcono';

@Component({
  selector: 'app-todos-icon',
  templateUrl: './todos-icon.component.html',
  styleUrls: ['./todos-icon.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TodosIconComponent implements OnInit, IIcono {

  @Input() fill: string;
  @Input() width: string;
  @Input() active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
