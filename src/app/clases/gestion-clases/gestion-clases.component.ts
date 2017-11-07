import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-clases',
  templateUrl: './gestion-clases.component.html',
  styleUrls: ['./gestion-clases.component.scss']
})
export class GestionClasesComponent implements OnInit {

  actividad;

  constructor() { }

  ngOnInit() {
    this.actividad = 'Musculacion';
  }

}
