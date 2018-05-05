import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRutinaComponent } from './gestion-rutina.component';

describe('GestionRutinaComponent', () => {
  let component: GestionRutinaComponent;
  let fixture: ComponentFixture<GestionRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
