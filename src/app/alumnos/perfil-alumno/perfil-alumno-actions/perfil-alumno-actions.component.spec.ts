import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAlumnoActionsComponent } from './perfil-alumno-actions.component';

describe('PerfilAlumnoActionsComponent', () => {
  let component: PerfilAlumnoActionsComponent;
  let fixture: ComponentFixture<PerfilAlumnoActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAlumnoActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAlumnoActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
