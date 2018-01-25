import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
  selector: 'app-seleccionar-clase',
  templateUrl: './seleccionar-clase.component.html',
  styleUrls: ['./seleccionar-clase.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SeleccionarClaseComponent implements OnInit {

  @ViewChild('modal') modal;

  constructor() { }

  ngOnInit() {
  }

}
