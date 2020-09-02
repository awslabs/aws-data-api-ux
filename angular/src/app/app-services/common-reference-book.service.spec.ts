import { TestBed } from '@angular/core/testing';

import { CommonReferenceBookService } from './common-reference-book.service';

describe('CommonReferenceBookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonReferenceBookService = TestBed.get(CommonReferenceBookService);
    expect(service).toBeTruthy();
  });
});
