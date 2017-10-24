import {
  Component,
  OnInit,
  ContentChildren,
  ContentChild,
  NgZone,
  AfterViewInit,
  ElementRef,
  QueryList,
  ChangeDetectorRef,
  Renderer2,
  HostListener
} from '@angular/core';
import { SchedulerColumnComponent } from './scheduler-column/scheduler-column.component';
import { SchedulerHoursComponent } from './scheduler-hours/scheduler-hours.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent
  implements OnInit, AfterViewInit {
  smallScreen: boolean;
  @ContentChildren(SchedulerColumnComponent) columns: QueryList<SchedulerColumnComponent>;
  @ContentChild(SchedulerHoursComponent, { read: ElementRef }) hours: ElementRef;
  private lastMaxHeights;

  constructor(
    private renderer: Renderer2,
    private ngzone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.smallScreen = window.innerWidth < 768;
  }

  ngAfterViewInit() {
    if (!this.smallScreen) {
      this.adjustHeight();
    }
    // this.columns.changes.subscribe(e => {
    //   setTimeout(() => this.adjustHeight());
    // });
    this.ngzone.runOutsideAngular(() =>
      Observable.fromEvent(window, 'resize')
        .subscribe(event => {
          this.updateScreenValue(event['target'].innerWidth);
          if (!this.smallScreen && this.maxHeightsChanged()) {
            this.ngzone.run(() => this.adjustHeight());
          }
        })
    );
  }

  maxHeightsChanged() {
    if (!this.lastMaxHeights) {
      return true;
    }
    return this.getMaxHeights().reduce((pv: any, cv, i) => {
      const mm = pv || (cv !== this.lastMaxHeights[i]);
      return mm;
    }, false);
  }

  updateScreenValue(iWidth) {
    if (iWidth < 768 && !this.smallScreen) {
      this.ngzone.run(() => this.smallScreen = true);
    } else if (iWidth >= 768 && this.smallScreen) {
      this.ngzone.run(() => this.smallScreen = false);
    }
  }

  adjustHeight() {
    if (!this.columns.reduce((pv: any, cr) => pv && cr.cells, true)) {
      return;
    }
    this.resetHeights();
    const maxHeights = this.lastMaxHeights = this.getMaxHeights();
    this.updateCellHeights(maxHeights);
  }

  private getMaxHeights(): number[] {
    const maxHeights = [];
    const columnas = this.columns.forEach(c => {
      const col = c.cells && c.cells.map(a => a.nativeElement['offsetHeight']);
      col.forEach(
        (v, i) => !(maxHeights[i] && maxHeights[i] > v) && (maxHeights[i] = v)
      );
    });
    return maxHeights;
  }

  /* Vuelvo a poner todas las celdas a su altura original, así puedo sacar las alturas */
  private resetHeights() {
    Array.from(this.hours.nativeElement.children[0].children)
    .forEach((c, i) => {
      this.columns.forEach((col, indiceColumna) => {
        col.cells.forEach(cell => {
          const celdaActualizar = cell.nativeElement.children[0];
          this.renderer.setStyle(celdaActualizar, 'height', 'auto');
      });
      if (c['className'] === 'hour-cell') {
        this.renderer.setStyle(c, 'height', 'auto');
      }
    });
  });
  }

  private updateCellHeights(maxHeights) {
    /* Itero sobre el array de horas, aunque se actualizarán tanto las celdas correspondientes
    a la columna de horas, como aquellas pertenecientes a las columnas de clases */
    Array.from(this.hours.nativeElement.children[0].children)
    .forEach((c, i) => {
      /* Actualizo las celdas de aquellas columnas de clases que no tienen la altura maxima */
      this.columns.forEach((col) => {
        col.cells.forEach((cell, indiceColumna) => {
          const celdaActualizar = cell.nativeElement.children[0];
          if (celdaActualizar.offsetHeight !== maxHeights[indiceColumna]) {
            this.renderer.setStyle(celdaActualizar, 'height', maxHeights[i] + 'px');
          }
        });
      });
      /* Actualizo las celdas de la columna de horas con la máxima altura encontrada */
      if (c['className'] === 'hour-cell') {
        this.renderer.setStyle(c, 'height', maxHeights[i - 1] + 'px');
      }
    });
  }

}
