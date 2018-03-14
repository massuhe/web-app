import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosIconComponent } from './todos-icon.component';

describe('TodosIconComponent', () => {
  let component: TodosIconComponent;
  let fixture: ComponentFixture<TodosIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
