import { TestBed, inject } from '@angular/core/testing';

import { NavService } from './nav.service';

describe('NavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavService]
    });
  });

  it('should be created', inject([NavService], (service: NavService) => {
    expect(service).toBeTruthy();
  }));
});
