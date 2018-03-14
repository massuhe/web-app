import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { IIcono } from '../_interfaces/IIcono';

@Component({
  selector: 'app-deudores-icon',
  templateUrl: './deudores-icon.component.html',
  styleUrls: ['./deudores-icon.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DeudoresIconComponent implements OnInit, IIcono {

  @Input() fill: string;
  @Input() width: string;
  @Input() active: boolean;

  constructor() { }

  ngOnInit() {
  }

}
