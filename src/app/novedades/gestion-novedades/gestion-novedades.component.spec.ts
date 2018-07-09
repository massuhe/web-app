import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNovedadesComponent } from './gestion-novedades.component';

describe('GestionNovedadesComponent', () => {
  let component: GestionNovedadesComponent;
  let fixture: ComponentFixture<GestionNovedadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionNovedadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
