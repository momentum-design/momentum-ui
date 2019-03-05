import { TestBed } from '@angular/core/testing';

import { TabsService } from './tabs.service';

describe('TabsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TabsService]
  }));

  it('should be created', () => {
    const service: TabsService = TestBed.get(TabsService);
    expect(service).toBeTruthy();
  });
});
