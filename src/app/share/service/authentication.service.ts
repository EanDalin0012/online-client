import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RequestDataService } from './get-data.service';
import { Utils } from '../utils/utils.static';
import { LOCAL_STORAGE } from '../constants/common.const';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthentcatiionService {
  private bizserverUrl: string;

  constructor(
    private httpClient: HttpClient,
    private modalService: ModalService,
    private translate: TranslateService
  ) {
    this.bizserverUrl = environment.bizMOBServer;
  }

  public login(auth: AuthentcatiionRequest, basicAuth?: BasicAuth): Promise<any> {
    return new Promise(resovle =>{
      $('div.loading').removeClass('none');

    if(!auth.user_name || auth.user_name === null) {
      this.modalService.alert({
        content: this.translate.instant('COMMON.MESSAGE.InValid_User_Name'),
        btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
        callback: res => {

        }
      });
      return;
    }

    let credentail: BasicAuth;
  
    if (!basicAuth) {
      credentail = {
        User_name: 'spring-security-oauth2-read-write-client',
        password: 'spring-security-oauth2-read-write-client-password1234'
      };
    } else {
      credentail = basicAuth;
    }

    const api = '/oauth/token';
    const uri = this.bizserverUrl + api;
    const btoa = 'Basic ' + window.btoa(credentail.User_name + ':' + credentail.password);

    const httpOptionsObj = {
      "Authorization": btoa
    };

    const formData = new FormData();
    formData.append('client_id', 'spring-security-oauth2-read-write-client');
    formData.append('grant_type', 'password');
    formData.append('username', auth.user_name);
    formData.append('password', auth.password);

    this.httpClient.post(uri, formData, {
      headers: new HttpHeaders(httpOptionsObj)
    }).subscribe(_auth => {
      $('div.loading').addClass('none');
      resovle(_auth);
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
