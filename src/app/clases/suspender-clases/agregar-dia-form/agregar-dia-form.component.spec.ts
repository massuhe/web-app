import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiaFormComponent } from './agregar-dia-form.component';

describe('AgregarDiaFormComponent', () => {
  let component: AgregarDiaFormComponent;
  let fixture: ComponentFixture<AgregarDiaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDiaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
