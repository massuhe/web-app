import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoEjercicioComponent } from './agregar-tipo-ejercicio.component';

describe('AgregarTipoEjercicioComponent', () => {
  let component: AgregarTipoEjercicioComponent;
  let fixture: ComponentFixture<AgregarTipoEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
