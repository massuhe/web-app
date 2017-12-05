import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoActividadesComponent } from './listado-actividades.component';

describe('ListadoActividadesComponent', () => {
  let component: ListadoActividadesComponent;
  let fixture: ComponentFixture<ListadoActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
