import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { CategoryReponseModel } from '../model/response/res-category';
import { RequestDataModel } from '../model/request/req-data';
import { CategoryModel } from '../model/model/category';
import { SRCRequestModel } from '../model/request/req-src';


@Injectable({
  providedIn: 'root'
})

export class RequestDataService {

  constructor(
    private serverService: ServerService
    ) {}

    inquiryCategory(): Promise<CategoryModel[]> {
      return new Promise( (resolve, reject) => {
      const trReq = new RequestDataModel();
      const api = '/api/category/v1/list';
      this.serverService.HTTPGet(api).then(resp => {
        const response   = resp as CategoryReponseModel;
        if (response) {
          resolve(response.body);
        } else {
          resolve([]);
        }
      });
    });
  }
/* 
  inquirySubCategoryList(): Promise<SubCategory[]> {
    return new Promise( (resovle) => {
      const trReq = new RequestData();
      const api = '/api/sub_category/subCategoryList';
      this.serverService.HTTPRequest(api, trReq).then(rest => {
        const response = rest as SubCategoryList;
        if (this.serverService.checkResponse(response.header)) {
          resovle(response.body.list);
        } else {
          resovle([]);
        }
      });
    });
  }

  inquiryCompanyList(): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      const trReq = new RequestData();
      const api = '/api/company_access/getList';
      console.log('trReq data', trReq);
      this.serverService.HTTPRequest(api, trReq).then(resp => {
        console.log('resprespresp', resp);
        const response = resp as CompanyList;
        if (this.serverService.checkResponse(response.header)) {
          resolve(response.body.list);
        } else {
          reject();
        }
      });
    });
  }

  inquirySupplierList(): Promise<Supplier[]> {
    return new Promise((resolve, reject) => {
      const trReq = new RequestData();
      const api = '/res/supplier/getList';
      this.serverService.HTTPRequest(api, trReq).then(res => {
        const response = res as SupplierList;
        if (this.serverService.checkResponse(response.header)) {
          resolve(response.body);
        } else {
          reject();
        }
      });
    });
  }

  inquiryProductList(): Promise<Product []> {
    return new Promise((resolve, reject) => {
      const trReq = new RequestData();
      const api = '/api/product/getProductList';
      this.serverService.HTTPRequest(api, trReq).then(res => {
        const response = res as ProductResponse;
        if (this.serverService.checkResponse(response.header)) {
          resolve(response.body.list);
        } else {
          reject();
        }
      });
    });
  }
*/

  requestUserInfo(user_name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const api = '/api/user/v1/load_user';
      const obj = {
        'user_name': user_name
      }
      this.serverService.HTTPGet(api, obj).then(_res => {
        const response = _res as any;
        console.log('user info', _res);
        resolve(response.body);
      });
    });
  } 

  srcRequest(src_id: string):Promise<any> {
    return new Promise((resolve, reject) => {
      const req = new SRCRequestModel();
      req.body.id = src_id;
      const api = '/api/base64/image/v1/read/'+src_id;
      this.serverService.HTTPGet(api).then(res => {
        console.log('base 64', res);
        resolve(res);
      });
    });
  }

}

