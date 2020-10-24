import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Utils } from '../utils/utils.static';
import { LOCAL_STORAGE } from '../constants/common.const';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = environment.bizMOBServer;

  constructor(private httpClient: HttpClient) { 

  }

  public upload(file: File):Promise<any>{
    return new Promise((resolve, reject) =>{
      console.log('start');
      let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
      const access_token = authorization.access_token;
          
      const httpOptionsObj = {
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        'Authorization': 'Bearer '+access_token,
        'cache-control': 'no-cache'
      };
      const user_info = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
      const lang = Utils.getSecureStorage(LOCAL_STORAGE.I18N);
      let t = new Testing();
      t.file = file;
      const data = this.httpClient.post('http://localhost:8080/api/file/upload2',t, {
        headers: new HttpHeaders(httpOptionsObj)
      }).subscribe(
        res => {
         console.log('file uploading', res); 
         resolve("dafd");
      }, error => {
        console.log(error);
      });
  
    
    });
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
      const api = '/api/file/resource?resource_id='+source_id;
      const uri = environment.bizMOBServer + api ;// + '?userId='+userInfo.id +'&lang='+lang;
      let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
      const access_token = authorization.access_token;
      const headers = { 
        'Authorization': 'Bearer ' + access_token
      }
      this.httpClient.get(uri, {headers}).subscribe(rest => {
        const result = rest as any;
        console.log('result', result);
        if(result.error != null) {
        } else {
          console.log(result.body.file_source);
          
          resolve(result.body.file_source);
        }
      });
    });
}
}

export class Testing {
  file: File;
  name: string;//"3425914.jpg"
  size: number;
  type: "image/jpeg"
}
