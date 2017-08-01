import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarItemDropdownComponent } from './navbar-item-dropdown.component';

describe('NavbarItemDropdownComponent', () => {
  let component: NavbarItemDropdownComponent;
  let fixture: ComponentFixture<NavbarItemDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarItemDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarItemDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
