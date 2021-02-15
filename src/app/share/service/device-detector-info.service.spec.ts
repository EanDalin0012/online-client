import { TestBed } from '@angular/core/testing';

import { DeviceDetectorInfoService } from './device-detector-info.service';

describe('DeviceDetectorInfoService', () => {
  let service: DeviceDetectorInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceDetectorInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
