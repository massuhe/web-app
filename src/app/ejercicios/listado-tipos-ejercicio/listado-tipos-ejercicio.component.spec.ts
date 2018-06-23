import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTiposEjercicioComponent } from './listado-tipos-ejercicio.component';

describe('ListadoTiposEjercicioComponent', () => {
  let component: ListadoTiposEjercicioComponent;
  let fixture: ComponentFixture<ListadoTiposEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoTiposEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTiposEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
