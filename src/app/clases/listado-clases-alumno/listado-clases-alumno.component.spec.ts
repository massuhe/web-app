import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoClasesAlumnoComponent } from './listado-clases-alumno.component';

describe('ListadoClasesAlumnoComponent', () => {
  let component: ListadoClasesAlumnoComponent;
  let fixture: ComponentFixture<ListadoClasesAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoClasesAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoClasesAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
