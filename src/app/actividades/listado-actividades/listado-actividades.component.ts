import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef
} from '@angular/core';
import { DialogService } from '../../core/dialog.service';
import { ActividadesService } from '../services/actividades.service';
import { Actividad } from '../models/Actividad';

@Component({
  selector: 'app-listado-actividades',
  templateUrl: './listado-actividades.component.html',
  styleUrls: ['./listado-actividades.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListadoActividadesComponent implements OnInit {
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;
  private actividades: Actividad[];
  rows;
  columns;
  showLoader;

  constructor(
    private actividadesService: ActividadesService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.actividades = [];
    this.rows = [];
    this.columns = [
      { prop: 'id', name: '#', width: 10 },
      { prop: 'nombre' },
      { prop: 'duracion' },
      { prop: 'totalAlumnos' },
      { prop: 'cantidadAlumnosPorClase', width: 200 },
      {
        name: 'Acciones',
        cellTemplate: this.editTmpl,
        headerTemplate: this.hdrTpl,
        width: 50
      }
    ];
    this.showLoader = true;
    this.getActividades();
  }

  borrarAlumno(idActividad) {
    this.dialogService.confirm('La actividad será borrada, ¿Desea continuar?')
      .then(_ => {
        this.showLoader = true;
        this.actividadesService.delete(idActividad)
          .subscribe(suc => {
            this.dialogService.success('La actividad se ha borrado correctamente');
            this.removeActividadFromArray(idActividad);
            this.showLoader = false;
          }, err => {
            this.dialogService.error('Se ha producido un error inesperado');
            this.showLoader = false;
          });
      });
  }

  private removeActividadFromArray(idActividad) {
    const index = this.actividades.findIndex(a => a.id === idActividad);
    this.actividades = this.rows = [...this.actividades.slice(0, index), ...this.actividades.slice(index + 1)];
  }

  private getActividades() {
    this.actividadesService.getListadoActividades()
      .subscribe((actividades: Actividad[]) => {
        this.actividades = actividades;
        this.rows = actividades;
        this.showLoader = false;
      },
      (error: Error) => {
        this.dialogService.error('Se ha producido un error inesperado', 'Error');
        this.showLoader = false;
      }
      );
  }
}
