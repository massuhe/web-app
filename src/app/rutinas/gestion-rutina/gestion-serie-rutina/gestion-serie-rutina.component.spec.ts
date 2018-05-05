import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSerieRutinaComponent } from './gestion-serie-rutina.component';

describe('GestionSerieRutinaComponent', () => {
  let component: GestionSerieRutinaComponent;
  let fixture: ComponentFixture<GestionSerieRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSerieRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSerieRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
