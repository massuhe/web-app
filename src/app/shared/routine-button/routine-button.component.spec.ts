import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineButtonComponent } from './routine-button.component';

describe('RoutineButtonComponent', () => {
  let component: RoutineButtonComponent;
  let fixture: ComponentFixture<RoutineButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
