import { TestBed, inject } from '@angular/core/testing';

import { EjerciciosService } from './ejercicios.service';

describe('EjerciciosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjerciciosService]
    });
  });

  it('should be created', inject([EjerciciosService], (service: EjerciciosService) => {
    expect(service).toBeTruthy();
  }));
});
