import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLCODE } from 'src/app/share/constants/common.const';
import { AuthService } from 'src/app/share/service/auth.service';
import { DataService } from 'src/app/share/service/data.service';
import { ModalService } from 'src/app/share/service/modal.service';
import { Utils } from 'src/app/share/utils/utils.static';
import { environment } from 'src/environments/environment';
declare var $;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  modal;
  userInfo: any;
  class: string;
  path: string;
  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private modalService: ModalService,
  ) {
  }
  timeCheckInterval: any;
  ngOnInit() {
    this.userInfo = Utils.getUserInfo();
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
    console.log('fdkaflkd');
    this.class = 'home';
    this.dataService.visitData.subscribe(message => {
      if (message !== '') {
        setTimeout(() => {
          this.path = message;
          console.log('message', message);
          this.setVisitList(message);
        });
      }
    });
    this.authService.setLastEventTime();
    this.timeCheckInterval = setInterval(() => {
      if (location.pathname !== '/login' && this.authService.isEventTimeOver(environment.autoLogoutTime)) {
        clearInterval(Number(this.timeCheckInterval));
        this.modalService.closeAllDialog();

        // this.bizServer.PPCBHTTPpost("signout", {}).subscribe();
        this.router.navigate(['/login']);
        this.authService.logout();
        // Timeout
        this.modalService.alert({
          content: 'For security reason, sessions end after 10 minutes of inactivity.\n' +
          'Your are required to sign in if  you wish to continue to use our services.\n' +
          'Thank you for using.',
        callback: () => {
        }
        });
      }
    }, 60000);
  }

  ionViewWillEnter() {

  }
  setVisitList(path: string) {
    // console.log(path);
    // URL Path common.const
    switch (path) {
      case 'accountinquirydeposit':
        path = 'accountinquiry';
        break;
      case 'accountinquiryloan':
        path = 'accountinquiry';
        break;
    }

    // const menuCode = MENUCODE2[path];
    // if (!!menuCode) {
    //   const reqTr1006 = new GNB1006Req(LANGUAGE[this.translate.currentLang]);
    //   reqTr1006.body.userID = this.userInfo.userID;
    //   reqTr1006.body.visitedMenuCode = menuCode;
    //   reqTr1006.body.channelTypeCode = CHANNEL.CIB;
    //   // /GNB1003
    //   // console.log(reqTr1006);
    //   this.bizServer.nPgPPCBHTTPpost("GNB1006", reqTr1006).subscribe(data => {
    //     const resTr1006 = data as GNB1006Res;
    //     if (this.bizServer.checkResponse(resTr1006)) {
    //     }
    //   });
    // } else {
    //   environment.production ? (() => '')() : console.error( '%c GNB1006 = Error path: ' + path, 'color: red; font-weight: bold;' );
    // }
  }

  onOpenPage(urlCode: string) {
    let url = '/main/';
    switch (urlCode) {
      case 'Register1000':
      case 'Register2000':
      case 'RegiPro':
      case 'Vendor':
      case 'RegiCate':
        url += `register/${URLCODE[urlCode]}`;
        break;
      case 'Import1000':
        url += `imports/${URLCODE[urlCode]}`; // 'imports/' + ${URLCODE[urlCode]} // URLCODE.Register5000;
        break;
      case '3000': // setting
        url += `home/${URLCODE[urlCode]}`;
        break;
      case 'User1000': // setting
      case 'UserMngAcc': // setting Set-Price-Product
      case 'User-Info':
      case 'Set-Price-Product':
        url += `user-management/${URLCODE[urlCode]}`;
        break;
    }
    this.router.navigate([url]);
  }

}
