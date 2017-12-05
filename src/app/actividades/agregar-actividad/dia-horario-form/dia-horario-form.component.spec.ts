import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaHorarioFormComponent } from './dia-horario-form.component';

describe('DiaHorarioFormComponent', () => {
  let component: DiaHorarioFormComponent;
  let fixture: ComponentFixture<DiaHorarioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaHorarioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaHorarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
