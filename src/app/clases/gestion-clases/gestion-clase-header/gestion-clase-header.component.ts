import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-gestion-clase-header',
  templateUrl: './gestion-clase-header.component.html',
  styleUrls: ['./gestion-clase-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionClaseHeaderComponent implements OnInit {

  @Input() fecha: Date;
  @Input() hora: string;
  @Input() actividad: string;

  constructor() { }

  ngOnInit() {
  }

}
