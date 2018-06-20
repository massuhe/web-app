import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarDetallesItemComponent } from './cargar-detalles-item.component';

describe('CargarDetallesItemComponent', () => {
  let component: CargarDetallesItemComponent;
  let fixture: ComponentFixture<CargarDetallesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarDetallesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarDetallesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
