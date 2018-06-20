import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiaRutinaComponent } from './agregar-dia-rutina.component';

describe('AgregarDiaRutinaComponent', () => {
  let component: AgregarDiaRutinaComponent;
  let fixture: ComponentFixture<AgregarDiaRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDiaRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDiaRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
