import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoClasesComponent } from './listado-clases.component';

describe('ListadoClasesComponent', () => {
  let component: ListadoClasesComponent;
  let fixture: ComponentFixture<ListadoClasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoClasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
