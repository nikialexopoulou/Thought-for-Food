import { TestBed, inject } from '@angular/core/testing';

import { ErrorhandlingService } from './errorhandling.service';

describe('ErrorhandlingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorhandlingService]
    });
  });

  it('should be created', inject([ErrorhandlingService], (service: ErrorhandlingService) => {
    expect(service).toBeTruthy();
  }));
});
