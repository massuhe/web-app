import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cargar-detalles-serie',
  templateUrl: './cargar-detalles-serie.component.html',
  styleUrls: ['./cargar-detalles-serie.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CargarDetallesSerieComponent implements OnInit {

  @Input() detalleSerie: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
