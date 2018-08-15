import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaSkeletonCardComponent } from './noticia-skeleton-card.component';

describe('NoticiaSkeletonCardComponent', () => {
  let component: NoticiaSkeletonCardComponent;
  let fixture: ComponentFixture<NoticiaSkeletonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiaSkeletonCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaSkeletonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
