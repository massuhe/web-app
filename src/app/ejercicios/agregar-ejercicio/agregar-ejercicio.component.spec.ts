import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEjercicioComponent } from './agregar-ejercicio.component';

describe('AgregarEjercicioComponent', () => {
  let component: AgregarEjercicioComponent;
  let fixture: ComponentFixture<AgregarEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
