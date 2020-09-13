import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from 'src/app/share/utils/utils.static';
import { LOCAL_STORAGE } from '../../share/constants/common.const';
import { Router } from '@angular/router';

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
    km: { class: "khmer", text: "ខ្មែរ"},
    zh: { class: "china", text: "中文"},
  };
  constructor(
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userInfo = Utils.getUserInfo();
  }

  onChangeLanguage(code: string) {
    this.langCode = code;
    this.translate.use( this.langCode );
    Utils.setSecureStorage( localStorage.I18N, this.langCode );
  }

  signOUt() {
    Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
    Utils.removeSecureStorage(LOCAL_STORAGE.Authorization);
    this.router.navigate(['/login']);
  }
}
