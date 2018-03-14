import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudoresIconComponent } from './deudores-icon.component';

describe('DeudoresIconComponent', () => {
  let component: DeudoresIconComponent;
  let fixture: ComponentFixture<DeudoresIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeudoresIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeudoresIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
