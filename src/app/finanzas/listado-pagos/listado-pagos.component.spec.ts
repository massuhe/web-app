import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPagosComponent } from './listado-pagos.component';

describe('ListadoPagosComponent', () => {
  let component: ListadoPagosComponent;
  let fixture: ComponentFixture<ListadoPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
