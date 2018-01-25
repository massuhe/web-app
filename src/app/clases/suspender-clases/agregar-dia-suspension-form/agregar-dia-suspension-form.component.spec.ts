import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDiaSuspensionFormComponent } from './agregar-dia-suspension-form.component';

describe('AgregarDiaSuspensionFormComponent', () => {
  let component: AgregarDiaSuspensionFormComponent;
  let fixture: ComponentFixture<AgregarDiaSuspensionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarDiaSuspensionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarDiaSuspensionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
