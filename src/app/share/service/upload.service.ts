import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Utils } from '../utils/utils.static';
import { LOCAL_STORAGE } from '../constants/common.const';
import { environment } from '../../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';
import { SelectEvent, FileInfo } from '@progress/kendo-angular-upload';
import { ServerService } from './server.service';
import { Base64RequestAdd } from '../model/request/base64-req';

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

  public upload(fileInfo: FileInfo, base64:string ):Promise<Boolean> {
    return new Promise(resolve =>{
      if(fileInfo && base64) {
        const api = environment.bizMOBServer +'/api/base64/image/write';
        const base64RequestAdd = new Base64RequestAdd();
        base64RequestAdd.body.file_type      = fileInfo.rawFile.type;
        base64RequestAdd.body.file_name      = fileInfo.name;
        base64RequestAdd.body.file_size      = fileInfo.size;
        base64RequestAdd.body.file_extension = fileInfo.extension;
        base64RequestAdd.body.base64         = base64;
        console.log('base64RequestAdd', base64RequestAdd);
        // this.server.HTTPPost(api, {}).then(resp =>{

        // });
      } else {
        resolve(false);
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
