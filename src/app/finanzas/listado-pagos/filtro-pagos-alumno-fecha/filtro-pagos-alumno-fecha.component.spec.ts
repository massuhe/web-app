import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPagosAlumnoFechaComponent } from './filtro-pagos-alumno-fecha.component';

describe('FiltroPagosAlumnoFechaComponent', () => {
  let component: FiltroPagosAlumnoFechaComponent;
  let fixture: ComponentFixture<FiltroPagosAlumnoFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroPagosAlumnoFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPagosAlumnoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
