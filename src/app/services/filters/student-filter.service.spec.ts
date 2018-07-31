import { TestBed, inject } from '@angular/core/testing';

import { StudentFilterService } from './student-filter.service';

describe('StudentFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentFilterService]
    });
  });

  it('should be created', inject([StudentFilterService], (service: StudentFilterService) => {
    expect(service).toBeTruthy();
  }));
});
