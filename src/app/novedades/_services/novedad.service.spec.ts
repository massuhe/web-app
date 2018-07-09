import { TestBed, inject } from '@angular/core/testing';

import { NovedadService } from './novedad.service';

describe('NovedadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NovedadService]
    });
  });

  it('should be created', inject([NovedadService], (service: NovedadService) => {
    expect(service).toBeTruthy();
  }));
});
