import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiaComponent } from './agregar-dia.component';

describe('AgregarDiaComponent', () => {
  let component: AgregarDiaComponent;
  let fixture: ComponentFixture<AgregarDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
