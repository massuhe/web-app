import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarDetallesRutinaComponent } from './cargar-detalles-rutina.component';

describe('CargarDetallesRutinaComponent', () => {
  let component: CargarDetallesRutinaComponent;
  let fixture: ComponentFixture<CargarDetallesRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarDetallesRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarDetallesRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
