import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-gestion-ejercicio',
  templateUrl: './gestion-ejercicio.component.html',
  styleUrls: ['./gestion-ejercicio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionEjercicioComponent implements OnInit {

  showScreenLoader: boolean;

  constructor() { }

  ngOnInit() {
  }

}
