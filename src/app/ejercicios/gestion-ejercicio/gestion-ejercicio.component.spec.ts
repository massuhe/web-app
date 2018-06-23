import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEjercicioComponent } from './gestion-ejercicio.component';

describe('GestionEjercicioComponent', () => {
  let component: GestionEjercicioComponent;
  let fixture: ComponentFixture<GestionEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
