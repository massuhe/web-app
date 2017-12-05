import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClaseHeaderComponent } from './gestion-clase-header.component';

describe('GestionClaseHeaderComponent', () => {
  let component: GestionClaseHeaderComponent;
  let fixture: ComponentFixture<GestionClaseHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionClaseHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionClaseHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
