import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaAlumnoItemComponent } from './asistencia-alumno-item.component';

describe('AsistenciaAlumnoItemComponent', () => {
  let component: AsistenciaAlumnoItemComponent;
  let fixture: ComponentFixture<AsistenciaAlumnoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaAlumnoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaAlumnoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
