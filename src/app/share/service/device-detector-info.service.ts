import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DeviceDetectorInfo } from '../model/model/device-detector-info';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorInfoService {


  constructor(private deviceDetectorService: DeviceDetectorService) { }

  public deviceDetectorInfo():DeviceDetectorInfo {
    const deviceInfo = this.deviceDetectorService.getDeviceInfo();

    return {
      userAgent: deviceInfo.userAgent,
      os: deviceInfo.os,
      browser: deviceInfo.browser,
      device: deviceInfo.device,
      os_version: deviceInfo.os_version,
      browser_version: deviceInfo.browser_version,
      deviceType: deviceInfo.deviceType,
      orientation: deviceInfo.orientation
    };

  }
}
