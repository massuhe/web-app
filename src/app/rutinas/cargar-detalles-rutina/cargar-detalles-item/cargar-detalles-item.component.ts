import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cargar-detalles-item',
  templateUrl: './cargar-detalles-item.component.html',
  styleUrls: ['./cargar-detalles-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CargarDetallesItemComponent implements OnInit {

  @Input() detalleItem: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
