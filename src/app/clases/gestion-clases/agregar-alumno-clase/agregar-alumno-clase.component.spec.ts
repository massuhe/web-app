import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlumnoClaseComponent } from './agregar-alumno-clase.component';

describe('AgregarAlumnoClaseComponent', () => {
  let component: AgregarAlumnoClaseComponent;
  let fixture: ComponentFixture<AgregarAlumnoClaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarAlumnoClaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlumnoClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
