import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarItemComponent } from './navbar-item.component';

describe('NavbarItemComponent', () => {
  let component: NavbarItemComponent;
  let fixture: ComponentFixture<NavbarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarItemComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarItemComponent);
    component = fixture.componentInstance;

    component.itemId = 1;
    component.path = 'home';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
