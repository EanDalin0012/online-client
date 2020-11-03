import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
import { LOCAL_STORAGE, Reponse_Status } from '../constants/common.const';
import { Base64WriteImage } from '../model/model/base64';
import { Base64WriteImageRequestAdd } from '../model/request/base64-req';
import { Utils } from '../utils/utils.static';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = environment.bizMOBServer;

  constructor(
    private httpClient: HttpClient,
    private server: ServerService
    ) { 

  }

  public upload(fileInfo: Base64WriteImage):Promise<Boolean> {
    return new Promise(resolve =>{
      if(fileInfo) {
        const api = '/api/base64/image/write';
        console.log('base64RequestAdd', fileInfo, api);
        const data = new Base64WriteImageRequestAdd();
        data.body.base64          = fileInfo.base64;
        data.body.file_name       = fileInfo.file_name;
        data.body.file_size       = fileInfo.file_size;
        data.body.file_type       = fileInfo.file_type;
        data.body.file_extension  = fileInfo.file_extension;
        data.body.id              = fileInfo.id;
        console.log('data:', data);
        this.server.HTTPPost(api, data).then(resp =>{
          if ( resp && resp.body.status === Reponse_Status.Y) {
              resolve(true);
          } else {
            resolve(false);
          }
        });
      }
    });
  }

  public remove(id: string) {

  }
  private baseUrl = 'http://localhost:8080/api/file/upload1';

  upload1(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const access_token = authorization.access_token;

    const httpOptionsObj = {
      'Authorization': 'Bearer '+access_token,
      'cache-control': 'no-cache'
    };
    let headers = new HttpHeaders(httpOptionsObj);
    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseUrl, formData,{
      headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFile(source_id: string):Promise<string> {
    return new Promise(resolve =>{
      const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
      const lang = Utils.getSecureStorage(localStorage.I18N);
      const api = '/api/file/resource1/'+source_id;
      const uri = environment.bizMOBServer + api ;// + '?userId='+userInfo.id +'&lang='+lang;
      let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
      const access_token = authorization.access_token;
      const headers = { 
        'Authorization': 'Bearer ' + access_token
      }
      this.httpClient.get(uri, {headers,responseType: "text"}).subscribe(rest => {
        const result = rest as any;
        console.log('result', rest);
        if(result.error != null) {
        } else {
          console.log(result);
          
          resolve(result);
        }
      });
    });
}

  async getFile1(source_id: string) {
  
    const userInfo = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
    const lang = Utils.getSecureStorage(localStorage.I18N);
    const api = '/api/file/resource1/'+source_id;
    const uri = environment.bizMOBServer + api ;// + '?userId='+userInfo.id +'&lang='+lang;
    let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const access_token = authorization.access_token;
    const headers = { 
      'Authorization': 'Bearer ' + access_token
    }
    const data = await this.httpClient.get(uri, {headers,responseType: "text"}).toPromise();
    console.log(data);
    return data;
  
}
}

export class Testing {
  file: File;
  name: string;//"3425914.jpg"
  size: number;
  type: "image/jpeg"
}
