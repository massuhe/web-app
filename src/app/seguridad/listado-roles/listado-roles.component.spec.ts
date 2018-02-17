import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoRolesComponent } from './listado-roles.component';

describe('ListadoRolesComponent', () => {
  let component: ListadoRolesComponent;
  let fixture: ComponentFixture<ListadoRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
