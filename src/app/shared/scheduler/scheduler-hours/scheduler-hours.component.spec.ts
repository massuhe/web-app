import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerHoursComponent } from './scheduler-hours.component';

describe('SchedulerHoursComponent', () => {
  let component: SchedulerHoursComponent;
  let fixture: ComponentFixture<SchedulerHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
