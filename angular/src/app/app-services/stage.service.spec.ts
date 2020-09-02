import { TestBed } from '@angular/core/testing';

import { StageService } from './stage.service';

describe('StageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StageService = TestBed.get(StageService);
    expect(service).toBeTruthy();
  });
});
