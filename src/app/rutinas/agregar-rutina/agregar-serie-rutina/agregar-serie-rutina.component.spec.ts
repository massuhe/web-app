import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSerieRutinaComponent } from './agregar-serie-rutina.component';

describe('AgregarSerieRutinaComponent', () => {
  let component: AgregarSerieRutinaComponent;
  let fixture: ComponentFixture<AgregarSerieRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSerieRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSerieRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
