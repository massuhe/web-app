import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosFijosComponent } from './movimientos-fijos.component';

describe('MovimientosFijosComponent', () => {
  let component: MovimientosFijosComponent;
  let fixture: ComponentFixture<MovimientosFijosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimientosFijosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosFijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
