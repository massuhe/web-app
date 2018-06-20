import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEjercicioModalComponent } from './agregar-ejercicio-modal.component';

describe('AgregarEjercicioModalComponent', () => {
  let component: AgregarEjercicioModalComponent;
  let fixture: ComponentFixture<AgregarEjercicioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEjercicioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEjercicioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
