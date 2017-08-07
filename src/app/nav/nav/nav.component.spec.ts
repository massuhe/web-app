import { NO_ERRORS_SCHEMA} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';


describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
