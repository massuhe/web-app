import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { Actividad } from '../../../actividades/models/Actividad';
import { ClasesService } from '../../../clases/services/clases.service';
import { Clase } from '../../../clases/models/clase';
import { Dia } from '../../../clases/models/dia';

@Component({
  selector: 'app-seleccionar-clase',
  templateUrl: './seleccionar-clase.component.html',
  styleUrls: ['./seleccionar-clase.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SeleccionarClaseComponent implements OnInit {

  @ViewChild('modal') modal;
  @Output() onSelectClase = new EventEmitter<Clase>();
  showLoader: boolean;
  private actividades: Actividad[];
  private actividadSeleccionada: Actividad;
  private claseSeleccionada: Clase;

  constructor(private claseService: ClasesService) { }

  ngOnInit() {
    this.showLoader = true;
    this.claseService.getClasesWithAsistencias()
    .subscribe((actividades: Actividad[]) => {
      this.actividades = actividades;
      this.actividadSeleccionada = this.actividades[0];
      this.showLoader = false;
    });
  }

  handleVisibilityChange(isVisible: boolean) {
    if (!isVisible) {
      this.actividadSeleccionada = this.actividades ? this.actividades[0] : undefined;
      this.claseSeleccionada = undefined;
    }
  }

  handleChangeClase(clase: Clase, dia: Dia) {
    if (clase.estadoClaseFija === 'no-disponible') {
      return ;
    }
    this.claseSeleccionada = new Clase({
      id: clase.id,
      horaInicio: clase.horaInicio,
      dia: new Dia({
        diaSemana: dia.diaSemana,
        actividad: new Actividad({nombre: this.actividadSeleccionada.nombre})
      })
    });
  }

  handleChangeActividad(actividadId: number) {
    this.actividadSeleccionada = this.actividades.find(a => a.id === actividadId);
  }

  handleAgregar() {
    this.onSelectClase.emit(this.claseSeleccionada);
    this.modal.hide();
  }

}
