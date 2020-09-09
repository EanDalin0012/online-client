import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from 'src/app/share/utils/utils.static';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo: any; // new User();
  sltLanguageList = false;
  langCode          = this.translate.currentLang; // 언어 코드
  langData          = { // 언어코드별 Text 및 Class
    en: { class: "eng", text: "English"},
    km: { class: "khmer", text: "ខ្មែរ"},
    zh: { class: "china", text: "中文"},
  };
  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.userInfo = Utils.getUserInfo();
  }

  onChangeLanguage(code: string) {
    this.langCode = code;
    this.translate.use( this.langCode );
    Utils.setSecureStorage( localStorage.I18N, this.langCode );
  }
}
