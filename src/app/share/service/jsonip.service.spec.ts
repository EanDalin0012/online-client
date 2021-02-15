import { TestBed } from '@angular/core/testing';

import { JsonipService } from './jsonip.service';

describe('JsonipService', () => {
  let service: JsonipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
