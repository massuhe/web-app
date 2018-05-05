import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSerieRutinaComponent } from './item-serie-rutina.component';

describe('ItemSerieRutinaComponent', () => {
  let component: ItemSerieRutinaComponent;
  let fixture: ComponentFixture<ItemSerieRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSerieRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSerieRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
