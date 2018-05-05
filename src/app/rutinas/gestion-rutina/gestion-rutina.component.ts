import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RutinaService } from '../_services/rutina.service';
import { Rutina } from '../_models/rutina';

@Component({
  selector: 'app-gestion-rutina',
  templateUrl: './gestion-rutina.component.html',
  styleUrls: ['./gestion-rutina.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GestionRutinaComponent implements OnInit {

  rutina: Rutina;
  semanaActive: number;
  diasTabs = [];
  diaActive = 0;
  numeroRutinaActive: number;
  maxNumeroRutina: number;

  constructor(private rutinaService: RutinaService) { }

  ngOnInit() {
    this.fetchRutina(true);
  }

  fetchRutina(init: boolean = false): void {
    this.rutinaService
    .getRutina()
    .subscribe(response => this.successFetchRutina(response, init));
  }

  successFetchRutina(response: any, init): void {
    this.rutina = response.rutina;
    if (init) {
      this.semanaActive = response.ultimaSemana;
      this.maxNumeroRutina = this.numeroRutinaActive = response.rutina.numero;
    }
    this.diasTabs = this.rutina.dias.map((d, i) => ({
      nombre: `Día ${i + 1}`,
      id: i
    }));
    this.diaActive = this.diasTabs[0].id;
  }

  changeNavegableValue(prop: string, amount: number) {
    this[prop] = this[prop] + amount;
  }

}
