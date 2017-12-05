import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarActividadFormComponent } from './agregar-actividad-form.component';

describe('AgregarActividadFormComponent', () => {
  let component: AgregarActividadFormComponent;
  let fixture: ComponentFixture<AgregarActividadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarActividadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarActividadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
