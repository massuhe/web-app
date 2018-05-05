import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDiaRutinaComponent } from './gestion-dia-rutina.component';

describe('GestionDiaRutinaComponent', () => {
  let component: GestionDiaRutinaComponent;
  let fixture: ComponentFixture<GestionDiaRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDiaRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDiaRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
