import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPagoComponent } from './buscar-pago.component';

describe('BuscarPagoComponent', () => {
  let component: BuscarPagoComponent;
  let fixture: ComponentFixture<BuscarPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
