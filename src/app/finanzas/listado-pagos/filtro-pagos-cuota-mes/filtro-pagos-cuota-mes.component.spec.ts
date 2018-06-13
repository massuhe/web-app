import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPagosCuotaMesComponent } from './filtro-pagos-cuota-mes.component';

describe('FiltroPagosCuotaMesComponent', () => {
  let component: FiltroPagosCuotaMesComponent;
  let fixture: ComponentFixture<FiltroPagosCuotaMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroPagosCuotaMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroPagosCuotaMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
