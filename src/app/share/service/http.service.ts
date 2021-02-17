import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CryptoService } from './crypto.service';
import { environment } from '../../../environments/environment.prod';
import { Utils } from '../utils/utils.static';
import { LocalStorage, AES_INFO } from '../constants/common.const';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  modal;
  data;
  private url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient,
    private modalService: ModalService,
    private router: Router,
    private translate: TranslateService,
    private cryptoService: CryptoService
  ) {
    this.url = environment.bizMOBServer;
  }

  public Post(api, TrClass: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const aesInfo: any = Utils.getSecureStorage(LocalStorage.LAST_EVENT_TIME) || {};
      console.log(aesInfo.timestamp);
      if (aesInfo && new Date().getTime() - aesInfo.timestamp > environment.autoLogoutTime) {

        if (this.modal) {
          this.modal.close();
        }

        this.modalService.alert({
          content: 'For security reason, sessions end after 10 minutes of inactivity.\n' +
            'Your are required to sign in if  you wish to continue to use our services.\n' +
            'Thank you for using.',
          callback: () => {
            $('kendo-dialog').remove();
            Utils.removeSecureStorage(LocalStorage.USER_INFO);
            Utils.removeSecureStorage(LocalStorage.Authorization);
            this.router.navigate(['/login']);
          }
        });
      } else {
        // $('div.loading').addClass('none');
        $('div.loading').removeClass('none');
        $('body').removeClass('loaded');

        const authorization = Utils.getSecureStorage(LocalStorage.Authorization);
        const access_token = authorization.access_token;
        if (!access_token) {
          this.modalService.alert({
            content: '',
            modalClass: ['open-alert'],
            btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
            callback: res => {
              Utils.removeSecureStorage(LocalStorage.Authorization);
              Utils.removeSecureStorage(LocalStorage.USER_INFO);
              this.router.navigate(['/login']);
            }
          });
          return;
        }

        const httpOptionsObj = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access_token
        };

        const userInfo = Utils.getSecureStorage(LocalStorage.USER_INFO);
        const lang = Utils.getSecureStorage(LocalStorage.I18N);
        const uri = this.url + api + '?userId=' + userInfo.id + '&lang=' + lang;

        const dataBody = JSON.stringify(TrClass);
        console.log('data', dataBody);
        const encryptionData = this.cryptoService.encrypt(dataBody);
        const requestData = {
          body: encryptionData.toString()
        };

        this.data = this.httpClient.post(uri, JSON.stringify(requestData), {
          headers: new HttpHeaders(httpOptionsObj)
        }).subscribe( res => {
            const newAesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
            newAesInfo.timestamp = new Date().getTime();
            Utils.setSecureStorage(AES_INFO.STORE, newAesInfo);
            $('body').addClass('loaded');
            $('div.loading').addClass('none');
            const result = res as any;
            if (result) {
              const responseData = JSON.parse(result);
              const rawData = responseData.body;
              const decryptData = JSON.parse(this.cryptoService.decrypt(String(rawData)));
              if (decryptData.error != null) {
                reject();
                this.message(result.error.message);
              } else {
                resolve(decryptData);
              }
            } else {
              reject();
            }
        }, error => {
          console.log(error);
        });
      }

    });
   }

   public Get(api, obj?: any): Promise<any> {
    return new Promise((resolve, reject) => {

      $('div.loading').removeClass('none');
      $('body').removeClass('loaded');
      const userInfo = Utils.getSecureStorage(LocalStorage.USER_INFO);
      const lang = Utils.getSecureStorage(LocalStorage.I18N);
      console.log('lang', lang);

      const uri = this.url + api + '? userId=' + userInfo.id + '&lang=' + lang;

      const authorization = Utils.getSecureStorage(LocalStorage.Authorization);

      const access_token = authorization.access_token;

      // if (!access_token) {
      //   this.modalService.alert({
      //     content: 'fadfadf',
      //     btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
      //     callback: _res => {

      //     }
      //   });
      //   return;
      // }
      const headers = {
        Authorization: 'Bearer ' + access_token
      };

      this.httpClient.get(uri, {headers}).subscribe(rest => {

        $('body').addClass('loaded');
        $('div.loading').addClass('none');
        const result = rest as any;
        console.log(rest);

        // const responseData = JSON.parse(result);
        // const rawData = responseData.body;
        // const decryptData = JSON.parse(this.cryptoService.decrypt(String(rawData)));

        // if (decryptData.error != null) {
        //   this.message(result.error.message);
        //   reject();
        // } else {
        //   resolve(decryptData);
        // }

      });
    });
  }

   private message(message: string) {
    this.modalService.alert({
      content:  '<h2>' + message + '</h2>',
      modalClass: ['pop_confirm open-alert'],
      btnText: 'Confirm',
      callback: (res) => {
        return false;
      }
    });
  }

}
