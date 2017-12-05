import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangoHorarioInputComponent } from './rango-horario-input.component';

describe('RangoHorarioInputComponent', () => {
  let component: RangoHorarioInputComponent;
  let fixture: ComponentFixture<RangoHorarioInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangoHorarioInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangoHorarioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
