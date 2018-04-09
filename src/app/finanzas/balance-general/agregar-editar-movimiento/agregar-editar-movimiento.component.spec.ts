import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarMovimientoComponent } from './agregar-editar-movimiento.component';

describe('AgregarEditarMovimientoComponent', () => {
  let component: AgregarEditarMovimientoComponent;
  let fixture: ComponentFixture<AgregarEditarMovimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarMovimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
