import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClaseBodyComponent } from './gestion-clase-body.component';

describe('GestionClaseBodyComponent', () => {
  let component: GestionClaseBodyComponent;
  let fixture: ComponentFixture<GestionClaseBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionClaseBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionClaseBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
