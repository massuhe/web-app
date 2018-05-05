import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Serie } from '../../_models/Serie';

@Component({
  selector: 'app-gestion-serie-rutina',
  templateUrl: './gestion-serie-rutina.component.html',
  styleUrls: ['./gestion-serie-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionSerieRutinaComponent implements OnInit {

  @Input() serie: Serie;
  @Input() semana: number;
  @Input() fecha: Date;

  constructor() { }

  ngOnInit() {
  }

}
