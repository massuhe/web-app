import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoCajaComponent } from './flujo-caja.component';

describe('FlujoCajaComponent', () => {
  let component: FlujoCajaComponent;
  let fixture: ComponentFixture<FlujoCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlujoCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
