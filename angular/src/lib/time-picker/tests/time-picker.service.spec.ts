import { TestBed } from '@angular/core/testing';

import { TimePickerService } from '../time-picker.service';

describe('TimePickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[TimePickerService]
  }));

  it('should be created', () => {
    const service: TimePickerService = TestBed.get(TimePickerService);
    expect(service).toBeTruthy();
  });
});
