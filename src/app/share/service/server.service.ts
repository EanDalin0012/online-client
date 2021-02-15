import { CryptoService } from './crypto.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as $ from 'jquery';
import { ModalService } from './modal.service';
import { Utils } from '../utils/utils.static';
import { AES_INFO, LOCAL_STORAGE } from '../constants/common.const';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { UploadEvent } from '@progress/kendo-angular-upload';


@Injectable({
  providedIn: 'root'
})

export class ServerService {
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

  public HTTPPost(api, TrClass: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const aesInfo: any = Utils.getSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME) || {};
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
            Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
            Utils.removeSecureStorage(LOCAL_STORAGE.Authorization);
            this.router.navigate(['/login']);
          }
        });
      } else {
        // $('div.loading').addClass('none');
        $('div.loading').removeClass('none');
        $('body').removeClass('loaded');

        const authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
        const access_token = authorization.access_token;
        if (!access_token) {
          this.modalService.alert({
            content: '',
            modalClass: ['open-alert'],
            btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
            callback: res => {
              Utils.removeSecureStorage(LOCAL_STORAGE.Authorization);
              Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
              this.router.navigate(['/login']);
            }
          });
          return;
        }

        const httpOptionsObj = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access_token
        };

        const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
        const lang = Utils.getSecureStorage(LOCAL_STORAGE.I18N);
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
            const responseData = JSON.parse(result);
            const rawData = responseData.body;
            const decryptData = JSON.parse(this.cryptoService.decrypt(String(rawData)));

            if (decryptData.error != null) {
              this.message(result.error.message);
              reject();
            } else {
              resolve(decryptData);
            }

        }, error => {
          console.log(error);
        });
      }

    });
   }



  public HTTPRequestFile(api, uploadEvent: UploadEvent): Promise<any> {
    return new Promise((resolve, reject) => {
      const aesInfo: any = Utils.getSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME) || {};
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
            Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
            Utils.removeSecureStorage(LOCAL_STORAGE.Authorization);
            this.router.navigate(['/login']);
          }
        });
      } else {
        // $('div.loading').addClass('none');
        $('div.loading').removeClass('none');
        $('body').removeClass('loaded');

        const authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
        const access_token = authorization.access_token;
        if (!access_token) {
          this.modalService.alert({
            content: '',
            btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
            callback: res => {
              Utils.removeSecureStorage(LOCAL_STORAGE.Authorization);
              Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
              this.router.navigate(['/login']);
            }
          });
          return;
        }

        const httpOptionsObj = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + access_token
        };

        const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
        const lang = Utils.getSecureStorage(localStorage.I18N);

        const uri = this.url + api + '?userId=' + userInfo.id + '&lang=' + lang + '&file=' + uploadEvent.files[0].rawFile;
        const formData = new FormData();

        this.data = this.httpClient.post(uri, formData, {
          headers: new HttpHeaders(httpOptionsObj)
        }).subscribe(
          res => {
            const newAesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
            newAesInfo.timestamp = new Date().getTime();
            Utils.setSecureStorage(AES_INFO.STORE, newAesInfo);
            $('body').addClass('loaded');
            $('div.loading').addClass('none');
            const result = res as any;
            if (result.error !== null) {
              this.message(result.error.message);
            }
            resolve(result);
        }, error => {
          console.log(error);
        });
      }

    });
   }

  public HTTPGet(api, obj?: any): Promise<any> {
    return new Promise((resolve, reject) => {

      $('div.loading').removeClass('none');
      $('body').removeClass('loaded');
      const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
      const lang = Utils.getSecureStorage(localStorage.I18N);
      const uri = this.url + api + '?userId=' + userInfo.id + '&lang=' + lang;

      const authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);

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

        const responseData = JSON.parse(result);
        const rawData = responseData.body;
        const decryptData = JSON.parse(this.cryptoService.decrypt(String(rawData)));

        if (decryptData.error != null) {
          this.message(result.error.message);
          reject();
        } else {
          resolve(decryptData);
        }

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
