import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEjerciciosComponent } from './listado-ejercicios.component';

describe('ListadoEjerciciosComponent', () => {
  let component: ListadoEjerciciosComponent;
  let fixture: ComponentFixture<ListadoEjerciciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEjerciciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEjerciciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
