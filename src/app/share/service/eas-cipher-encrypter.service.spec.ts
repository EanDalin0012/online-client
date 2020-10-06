import { TestBed } from '@angular/core/testing';

import { EasCipherEncrypterService } from './eas-cipher-encrypter.service';

describe('EasCipherEncrypterService', () => {
  let service: EasCipherEncrypterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasCipherEncrypterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
