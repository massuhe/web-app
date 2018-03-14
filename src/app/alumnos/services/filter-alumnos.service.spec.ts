import { TestBed, inject } from '@angular/core/testing';

import { FilterAlumnosService } from './filter-alumnos.service';

describe('FilterAlumnosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterAlumnosService]
    });
  });

  it('should be created', inject([FilterAlumnosService], (service: FilterAlumnosService) => {
    expect(service).toBeTruthy();
  }));
});
