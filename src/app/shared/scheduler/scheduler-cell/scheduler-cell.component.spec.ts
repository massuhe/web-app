import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerCellComponent } from './scheduler-cell.component';

describe('SchedulerCellComponent', () => {
  let component: SchedulerCellComponent;
  let fixture: ComponentFixture<SchedulerCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
