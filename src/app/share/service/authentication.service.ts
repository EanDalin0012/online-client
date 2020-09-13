import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { environment } from '../../../environments/environment';
import { ModalService } from './modal.service';
import { LOCAL_STORAGE } from '../constants/common.const';
import { Utils } from '../utils/utils.static';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthentcatiionService {
  private bizserverUrl: string;

  constructor(
    private httpClient: HttpClient,
    private modalService: ModalService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.bizserverUrl = environment.bizMOBServer;
  }

  public login(auth: AuthentcatiionRequest, basicAuth?: BasicAuth) {
      this.accessTokenRequest(auth, basicAuth).then(response =>{
        const _authorization = response as any;
        console.log('_authorization', _authorization);
        
        if(_authorization.access_token) {
          Utils.setSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME, String(new Date().getTime()));
          Utils.setSecureStorage(LOCAL_STORAGE.Authorization, _authorization);
          this.loadUserByUserName(auth.user_name).then(userResponse =>{

            if(userResponse) {
              Utils.setSecureStorage(LOCAL_STORAGE.USER_INFO, userResponse.body);
              this.router.navigate(['/main/home']);
              console.log(userResponse);
            }
          });
        }

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
      const uri = this.bizserverUrl + api;
      const btoa =
        'Basic ' +
        window.btoa(credentail.User_name + ':' + credentail.password);

      const httpOptionsObj = {
        Authorization: btoa,
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
        .subscribe((_auth) => {
          $('div.loading').addClass('none');
          resovle(_auth);
        });
    });
  }

  private loadUserByUserName(userName: string): Promise<any> {
    return new Promise((resolve) => {
      $('div.loading').removeClass('none');
      const lang = Utils.getSecureStorage(localStorage.I18N);
      const api = '/api/user/load_user';
      const uri =
        this.bizserverUrl + api + '?userName=' + userName + '&lang=' + lang;
      let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
      const access_token = authorization.access_token;
      const headers = {
        Authorization: 'Bearer ' + access_token,
      };
      this.httpClient.get(uri, { headers }).subscribe((rest) => {
        $('body').addClass('loaded');
        $('div.loading').addClass('none');
        resolve(rest);
      });
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