import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerColumnComponent } from './scheduler-column.component';

describe('SchedulerColumnComponent', () => {
  let component: SchedulerColumnComponent;
  let fixture: ComponentFixture<SchedulerColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
