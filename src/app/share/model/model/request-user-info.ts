import { DeviceDetectorInfo } from './device-detector-info';
export interface RequestUserInfo {
  userName: string;
  deviceInfo: DeviceDetectorInfo;
  networkIP: string;
}
