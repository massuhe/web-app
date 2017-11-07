import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClasesComponent } from './gestion-clases.component';

describe('GestionClasesComponent', () => {
  let component: GestionClasesComponent;
  let fixture: ComponentFixture<GestionClasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionClasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
