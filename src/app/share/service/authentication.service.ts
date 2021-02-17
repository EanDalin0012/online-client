import { CryptoService } from './crypto.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';
import { ModalService } from './modal.service';
import { LocalStorage } from '../constants/common.const';
import { Utils } from '../utils/utils.static';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { CacheInfo } from '../cache/cache-info';
import { LoadUserInfo } from '../model/model/load-user-info';

@Injectable({
  providedIn: 'root',
})
export class AuthentcatiionService {
  private baseUrl: string;


  constructor(
    private httpClient: HttpClient,
    private modalService: ModalService,
    private translate: TranslateService,
    private router: Router,
    private cryptoService: CryptoService,
    private httpService: HttpService
  ) {
    this.baseUrl = environment.bizMOBServer;
  }

  public login(auth: AuthentcatiionRequest, basicAuth?: BasicAuth) {
      this.accessTokenRequest(auth, basicAuth).then(response => {
        console.log(response);

        const authorization = JSON.parse(response);
        const rawData = authorization.body;
        const decryptData = JSON.parse(this.cryptoService.decrypt(String(rawData)));

        if (decryptData.access_token) {
          Utils.setSecureStorage(LocalStorage.LAST_EVENT_TIME, String(new Date().getTime()));
          Utils.setSecureStorage(LocalStorage.Authorization, decryptData);
          this.loadUserByUserName(auth.user_name).then(userResponse => {
          console.log(userResponse);

            if (userResponse) {
              Utils.setSecureStorage(LocalStorage.USER_INFO, userResponse);
              this.router.navigate(['/main/home']);
              console.log(userResponse);
            }
          });
        }

      });
  }


  public revokeToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      const userInfo = Utils.getSecureStorage(LocalStorage.USER_INFO);
      const lang = Utils.getSecureStorage(localStorage.I18N);
      const api  = "/api/user/oauth/revoke-token";
      const uri = this.baseUrl + api + '?userId=' + userInfo.id + '&lang=' + lang;
      let authorization = Utils.getSecureStorage(LocalStorage.Authorization);
      const access_token = authorization.access_token;
      const headers = {
        'Authorization': 'Bearer ' + access_token
      };

      this.httpClient.get(uri, {headers}).subscribe(rest => {
        const result = rest as any;
        if(result.error != null) {
          this.message(result.error.message);
          reject();
        } else {
          resolve(result);
        }
      });

    });
  }

  private accessTokenRequest(auth: AuthentcatiionRequest, basicAuth?: BasicAuth): Promise<any> {
    return new Promise((resovle) => {
      $('div.loading').removeClass('none');

      if (!auth.user_name || auth.user_name === null) {
        this.modalService.alert({
          content: this.translate.instant('COMMON.MESSAGE.InValid_User_Name'),
          btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
          callback: (res) => {},
        });
        return;
      }

      let credentail: BasicAuth;

      if (!basicAuth) {
        credentail = {
          User_name: 'spring-security-oauth2-read-write-client',
          password: 'spring-security-oauth2-read-write-client-password1234',
        };
      } else {
        credentail = basicAuth;
      }

      const api = '/oauth/token';
      const uri = this.baseUrl + api;
      const btoa =
        'Basic ' +
        window.btoa(credentail.User_name + ':' + credentail.password);

      const httpOptionsObj = {
        Authorization: btoa
      };

      const formData = new FormData();
      formData.append('client_id', 'spring-security-oauth2-read-write-client');
      formData.append('grant_type', 'password');
      formData.append('username', auth.user_name);
      formData.append('password', auth.password);

      this.httpClient
        .post(uri, formData, {
          headers: new HttpHeaders(httpOptionsObj),
        })
        .subscribe((auth) => {
          $('div.loading').addClass('none');
          resovle(auth);
        });
    });
  }

  private loadUserByUserName(userName: string): Promise<any> {
    return new Promise((resolve, reject) => {

      let loadUserInfo = new LoadUserInfo();
      const device = CacheInfo.deviceinfo;
      const networkIp = CacheInfo.networkIP;
      loadUserInfo.deviceInfo = device;
      loadUserInfo.networkIP  = networkIp;
      loadUserInfo.userName = userName;

      const authorize = Utils.getSecureStorage(LocalStorage.Authorization);
      const accessToken = authorize.access_token;
      if (!accessToken) {
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

      const dataBody = JSON.stringify(loadUserInfo);
      const encryptionData = this.cryptoService.encrypt(dataBody);
      const requestData = {
        body: encryptionData.toString()
      };
      const lang = Utils.getSecureStorage(LocalStorage.I18N);
      const httpOptionsObj = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      };
      const uri = this.baseUrl + '/api/user/v1/load/user?lang=' + lang;

      $('div.loading').removeClass('none');
      $('body').removeClass('loaded');


      this.httpClient.post(uri, JSON.stringify(requestData), {
        headers: new HttpHeaders(httpOptionsObj)
      }).subscribe( res => {
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

    });
  }

  private message(message: string) {
    this.modalService.alert({
      // tslint:disable-next-line:max-line-length
      content:  '<h2>'+message+'</h2>',
      modalClass: ['pop_confirm'],
      btnText: 'Confirm',
      callback: (res) => {
        return false;
      }
    });
  }
}

export interface BasicAuth {
  User_name: string;
  password: string;
}

export interface AuthentcatiionRequest {
  grant_type?: string;
  user_name: string;
  password: string;
  client_id?: string;
}
