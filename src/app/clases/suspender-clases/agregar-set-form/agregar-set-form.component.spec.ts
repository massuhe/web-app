import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSetFormComponent } from './agregar-set-form.component';

describe('AgregarSetFormComponent', () => {
  let component: AgregarSetFormComponent;
  let fixture: ComponentFixture<AgregarSetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
