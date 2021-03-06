import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from 'src/app/share/utils/utils.static';
import { LocalStorage, ResponseStatus } from '../../share/constants/common.const';
import { Router } from '@angular/router';
import { AuthentcatiionService } from '../../share/service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo: any;
  sltLanguageList = false;
  langCode          = this.translate.currentLang;
  langData          = {
    en: { class: "eng", text: "English"},
    kh: { class: "khmer", text: "ខ្មែរ"},
    ch: { class: "china", text: "中文"},
  };
  constructor(
    private translate: TranslateService,
    private router: Router,
    private authentcatiionService: AuthentcatiionService
  ) { }

  ngOnInit(): void {
    this.userInfo = Utils.getUserInfo();
  }

  onChangeLanguage(code: string) {
    this.langCode = code;
    console.log(this.langCode, localStorage.I18N, code);
    Utils.setSecureStorage(LocalStorage.I18N, this.langCode );
    this.translate.use( this.langCode );
  }

  Logout() {
    this.authentcatiionService.revokeToken().then(resp => {
      if(resp.body.status === ResponseStatus.Y) {
        Utils.removeSecureStorage(LocalStorage.USER_INFO);
        Utils.removeSecureStorage(LocalStorage.Authorization);
        this.router.navigate(['/login']);
      }
    });
  }

  Profile() {

  }
}
