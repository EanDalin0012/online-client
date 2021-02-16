import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE, LocalStorage, deviceInfo } from './share/constants/common.const';
import { Utils } from './share/utils/utils.static';
import { JsonipService } from './share/service/jsonip.service';
import { DeviceDetectorInfoService } from './share/service/device-detector-info.service';
import { CacheInfo } from './share/cache/cache-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'online-client';

  constructor(
    private translate: TranslateService,
    private jsonipService: JsonipService,
    private deviceDetectorInfoService: DeviceDetectorInfoService
  ) {
    this.setInitialAppLanguage();
  }

  ngOnInit() {

    this.jsonipService.jsonIp().then( response =>{
      console.log('jsonipService', response);
      CacheInfo.networkIP = response;
    });

    const deviceDetectorInfo = this.deviceDetectorInfoService.deviceDetectorInfo();
    CacheInfo.deviceinfo = deviceDetectorInfo;

    console.log('deviceDetectorInfo', deviceDetectorInfo);

  }

  // tslint:disable-next-line:typedef
  setInitialAppLanguage() {
    const i18n = Utils.getSecureStorage(LocalStorage.I18N );
    if ( !i18n ) {
      Utils.setSecureStorage(LocalStorage.I18N, LANGUAGE.I18N_EN.toString());
      this.translate.setDefaultLang( LANGUAGE.I18N_EN.toString() );
      this.translate.use( LANGUAGE.I18N_EN.toString() );
    } else {
      this.translate.setDefaultLang( 'en' );
      this.translate.use( i18n );
    }
  }
}
