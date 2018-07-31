import { TestBed, inject } from '@angular/core/testing';

import { TeacherFilterService } from './teacher-filter.service';

describe('TeacherFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherFilterService]
    });
  });

  it('should be created', inject([TeacherFilterService], (service: TeacherFilterService) => {
    expect(service).toBeTruthy();
  }));
});
