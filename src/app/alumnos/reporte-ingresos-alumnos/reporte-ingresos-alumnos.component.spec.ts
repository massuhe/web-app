import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteIngresosAlumnosComponent } from './reporte-ingresos-alumnos.component';

describe('ReporteIngresosAlumnosComponent', () => {
  let component: ReporteIngresosAlumnosComponent;
  let fixture: ComponentFixture<ReporteIngresosAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteIngresosAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteIngresosAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
