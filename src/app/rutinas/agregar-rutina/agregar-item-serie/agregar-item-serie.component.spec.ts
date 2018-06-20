import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarItemSerieComponent } from './agregar-item-serie.component';

describe('AgregarItemSerieComponent', () => {
  let component: AgregarItemSerieComponent;
  let fixture: ComponentFixture<AgregarItemSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarItemSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarItemSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
