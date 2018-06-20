import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAlumnoDataComponent } from './perfil-alumno-data.component';

describe('PerfilAlumnoDataComponent', () => {
  let component: PerfilAlumnoDataComponent;
  let fixture: ComponentFixture<PerfilAlumnoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAlumnoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAlumnoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
