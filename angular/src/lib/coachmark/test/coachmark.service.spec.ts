import { TestBed } from '@angular/core/testing';

import { CoachmarkService } from '../coachmark.service';

describe('CoachmarkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoachmarkService = TestBed.get(CoachmarkService);
    expect(service).toBeTruthy();
  });
});
