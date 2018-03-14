import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAlumnosComponent } from './filter-alumnos.component';

describe('FilterAlumnosComponent', () => {
  let component: FilterAlumnosComponent;
  let fixture: ComponentFixture<FilterAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
