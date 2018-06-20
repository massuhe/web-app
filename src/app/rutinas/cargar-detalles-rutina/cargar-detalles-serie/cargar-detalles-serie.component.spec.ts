import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarDetallesSerieComponent } from './cargar-detalles-serie.component';

describe('CargarDetallesSerieComponent', () => {
  let component: CargarDetallesSerieComponent;
  let fixture: ComponentFixture<CargarDetallesSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarDetallesSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarDetallesSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
