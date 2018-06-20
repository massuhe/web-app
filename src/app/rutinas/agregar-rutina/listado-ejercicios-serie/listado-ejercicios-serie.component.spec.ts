import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEjerciciosSerieComponent } from './listado-ejercicios-serie.component';

describe('ListadoEjerciciosSerieComponent', () => {
  let component: ListadoEjerciciosSerieComponent;
  let fixture: ComponentFixture<ListadoEjerciciosSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoEjerciciosSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEjerciciosSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
