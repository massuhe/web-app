import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasPaginatorComponent } from './noticias-paginator.component';

describe('NoticiasPaginatorComponent', () => {
  let component: NoticiasPaginatorComponent;
  let fixture: ComponentFixture<NoticiasPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiasPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
