import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDropdownComponent } from './item-dropdown.component';
import { NavbarItemDropdownComponent } from '../navbar-item-dropdown/navbar-item-dropdown.component';

describe('ItemDropdownComponent', () => {
  let component: ItemDropdownComponent;
  let fixture: ComponentFixture<ItemDropdownComponent>;

  beforeEach(async(() => {

    const navbarItemDropdownStub = {
      itemId: 1,
      nombre: 'Hue'
    };

    TestBed.configureTestingModule({
      declarations: [ ItemDropdownComponent ],
      providers: [{provide: NavbarItemDropdownComponent, useValue: navbarItemDropdownStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDropdownComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
