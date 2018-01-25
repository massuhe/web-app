import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenderClasesComponent } from './suspender-clases.component';

describe('SuspenderClasesComponent', () => {
  let component: SuspenderClasesComponent;
  let fixture: ComponentFixture<SuspenderClasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspenderClasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenderClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
