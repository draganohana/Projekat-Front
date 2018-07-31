import { TestBed, inject } from '@angular/core/testing';

import { ParentFilterService } from './parent-filter.service';

describe('ParentFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentFilterService]
    });
  });

  it('should be created', inject([ParentFilterService], (service: ParentFilterService) => {
    expect(service).toBeTruthy();
  }));
});
