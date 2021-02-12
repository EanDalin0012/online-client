import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE, LOCAL_STORAGE } from './share/constants/common.const';
import { Utils } from './share/utils/utils.static';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-client';

  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    this.setInitialAppLanguage();
  }

  // tslint:disable-next-line:typedef
  setInitialAppLanguage() {
    const i18n = Utils.getSecureStorage( LOCAL_STORAGE.I18N );
    if ( !i18n ) {
      Utils.setSecureStorage(LOCAL_STORAGE.I18N, LANGUAGE.I18N_EN.toString());
      this.translate.setDefaultLang( LANGUAGE.I18N_EN.toString() );
      this.translate.use( LANGUAGE.I18N_EN.toString() );
    } else {
      this.translate.setDefaultLang( 'en' );
      this.translate.use( i18n );
    }
  }
}
