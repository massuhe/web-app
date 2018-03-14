import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAlumnoCardComponent } from './filter-alumno-card.component';

describe('FilterAlumnoCardComponent', () => {
  let component: FilterAlumnoCardComponent;
  let fixture: ComponentFixture<FilterAlumnoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAlumnoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAlumnoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
