import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChunkSettings, FileInfo, FileRestrictions, FileState, RemoveEvent, SelectEvent, SuccessEvent, UploadEvent } from '@progress/kendo-angular-upload';

import { environment } from 'src/environments/environment';
import { ProductModel } from '../../share/model/model/product';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { RequestDataService } from '../../share/service/get-data.service';
import { ProductModelRequest } from '../../share/model/request/req-product';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { Reponse_Status, BTN_ROLES, LOGO_FILE_EXT, LOCAL_STORAGE, AES_INFO } from '../../share/constants/common.const';
import { CategoryModel } from '../../share/model/model/category';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { FileRequestModel } from '../../share/model/request/req-file';
import { Utils } from '../../share/utils/utils.static';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-regi-pro-add',
  templateUrl: './regi-pro-add.component.html',
  styleUrls: ['./regi-pro-add.component.css']
})
export class RegiProAddComponent implements OnInit {

  
  @ViewChild('subCate', {static: true}) subCate;
  modal;
  typeList: any[] = [];
  categoryInfo = new  CategoryModel();
  subCategoryId: number;

  subCategoryName: string;

  translateTxt: any;
  categoryList = new Array<CategoryModel>();

  valuePrimitiveMainCategory: boolean;
  defaultMainCategoryInfo: CategoryModel = {
    id: 0,
    name: 'Select Main Category',
    description: null,
    create_by: null,
    modify_by: null,
    create_date: null,
    modify_date: null,
    status: null
  };

  ngClassList: string;

  // img declear
  uploadbtn = true;
  public imagePreviews: any[] = [];
  public uploadRemoveUrl = 'removeUrl';
  userinfo: any;

  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: LOGO_FILE_EXT
  };

  // public uploadSaveUrl: string;

  selectedFile: File;
  message: string;
  userInfo: any;

  api = '/api/file/upload';
  public chunkSettings: ChunkSettings = {
    size: 102400
  };

  product: ProductModel;
  subCateId: number;
  proName: string;
  resourceFileInfoId: string;
  description: string;
  category_list = new Array<CategoryModel>();
  filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith'
  };
  uploadSaveUrl: string;

  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService,
    private dataService: RequestDataService,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.uploadSaveUrl = environment.bizMOBServer + '/api/mobile/upload';
    this.uploadRemoveUrl = environment.bizMOBServer + '/api/file/removeUrl';
    this.valuePrimitiveMainCategory = true;
    this.translate.get('Home8100').subscribe((res) => {
      this.translateTxt = res;
     });
    this.inquiryCategory();
    this.inquirySubCategory();
  }

  close() {
    this.modal.close();
  }

  inquiryCategory() {
    this.dataService.inquiryCategory().then(response =>{
      this.category_list = response;
      console.log(this.category_list);
    }); 
  }

  valueChangeMainCategory(value) {
    // console.log(value);
    // if (value) {
    //   this.subCategoryInfo = undefined;
    //   this.valuePrimitiveSubCategory = true;
    //   this.subCategoryList = [];
    //   this.subCatListTrm.forEach(element => {
    //     if (Number(value) === element.mainCategoryId) {
    //       this.subCategoryList.push(element);
    //     }
    //   });
    //   this.ngClassList = 'active-input';
    // } else {
    //   this.ngClassList = '';
    // }
  }

  valueChangeSubCategory(value) {
    if (value) {
      this.subCategoryId = value;
    }
  }

  onClickRegister() {
    if (this.isValid() === true) {
      const trReq                = new ProductModelRequest();
      const api = '/api/product/save';
      this.serverService.HTTPPost(api, trReq).then(rest => {
        const response = rest as ResponseDataModel;
        if ( response && response.body.status === Reponse_Status.Y) {
          this.modal.close( {close: BTN_ROLES.SAVE});
        }
      });
    }

  }

  onClickBtnSubCategory() {
    this.subCategoryName = undefined;
  }

  onClickBtnDescr() {
    this.description = undefined;
  }

  isValid(): boolean {
     

      return true;
  }

  inquirySubCategory() {
    // this.dataService.inquirySubCategoryList().then(response => {
    //   this.subCatListTrm = response;
    // });
  }

  // upload img

  public onRemove(ev: RemoveEvent): void {
    if ( this.resourceFileInfoId !== undefined) {
      ev.data = {
        resourceFileInfoId: this.resourceFileInfoId
      };
    }

    ev.files.forEach((file: FileInfo) => {
      this.imagePreviews = null;
    });

  }
  public clearEventHandler(val): void {
    console.log('Clearing the file upload', val);
    this.imagePreviews = [];
  }

  successEventHandler(e: SuccessEvent) {
    console.log('response file update', e);
    // const responseData = e.response.body;
    // if (responseData) {
    //   if  (responseData.header.result === true) {
    //     this.resourceFileInfoId = responseData.body.id;
    //     const url = e.response.body.body.imageURL;
    //   }
    // }
  }

  public removeEventHandler(e: RemoveEvent): void {

    const index = this.imagePreviews.findIndex(item => item.uid === e.files[0].uid);

    if (index >= 0) {
      this.imagePreviews.splice(index, 1);
    }
  }

  public selectEventHandler(e: SelectEvent): void {
    const that = this;

    e.files.forEach((file) => {

      if (!file.validationErrors) {
        const reader = new FileReader();

        reader.onload = function (ev) {
          const image = {
            src: ev.target['result'],
            uid: file.uid
          };
          console.log(ev.target);
          console.log(typeof (ev.target));
          that.imagePreviews.unshift(image);
        };
        console.log('file', file.rawFile);
        reader.readAsDataURL(file.rawFile);
      }
    });
  }


  public completeEventHandler(val) {
    console.log(val);
  }

  uploadEventHandler(e: UploadEvent) {
    let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const access_token = authorization.access_token;
    const httpOptionsObj = {
      'Content-Type': 'application/json',
       'Authorization': 'Bearer '+access_token
    };
    const headers=  new HttpHeaders(httpOptionsObj);
    console.log('header', headers, httpOptionsObj);
    e.headers = headers;
    e.data = {
      userID : 1,
      customerNo: 1,
      corporateUserProfileImageURL: '',
      userFile : e.files[0].rawFile
    };
    console.log('file', e.headers);
    // this.doRequestFile(e.files[0].rawFile);
  }

  uploadFileImage(file: UploadEvent): string {
    const trReq                   = new FileRequestModel();
    trReq.body = file.files[0];
    console.log('trReq',trReq);
    const api = '/api/file/upload';
    this.serverService.HTTPRequestFile(api, file).then(response => {
      const responseData = response as ResponseDataModel;
      if ( responseData && responseData.body.status === Reponse_Status.Y) {
        return responseData.body.status;
      }
    });
    return "N";
  }

  public showButton(state: FileState): boolean {
    return (state === FileState.Uploaded) ? true : false;
  }

  public remove(upload, uid: string) {
    upload.removeFilesByUid(uid);
  }

  
  doRequestFile(file1: File) {
    console.log('file1', file1);
    let file = new FileUpload
    file.file = file1;

    let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const access_token = authorization.access_token;
        
    const httpOptionsObj = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+access_token
    };
    const user_info = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
    const lang = Utils.getSecureStorage(LOCAL_STORAGE.I18N);
    const uri = environment.bizMOBServer + '/api/mobile/upload?userId='+user_info.id +'&lang='+lang;
    const formData = new FormData()
    formData.append('file', file1);

    const data = this.httpClient.post(uri, formData, {
      headers: new HttpHeaders(httpOptionsObj)
    }).subscribe(
      res => {
       console.log('file uploading', res); 
    }, error => {
      console.log(error);
    });

    this.serverService.HTTPPost(environment.bizMOBServer+'/api/file/upload1', file).then(res=>{
      console.log('res', res);
    });
  }


uploadFiles(files: File) {
  console.log('working now', files);
    let authorization = Utils.getSecureStorage(LOCAL_STORAGE.Authorization);
    const access_token = authorization.access_token;
        
    const httpOptionsObj = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+access_token
    };
    const user_info = Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO);
    const lang = Utils.getSecureStorage(LOCAL_STORAGE.I18N);
    const uri = environment.bizMOBServer + '/api/mobile/upload?userId='+user_info.id +'&lang='+lang;
    const formData = new FormData()
    formData.append('file', files);

    const data = this.httpClient.post(environment.bizMOBServer+'/api/file/upload1', formData, {
      headers: new HttpHeaders(httpOptionsObj)
    }).subscribe(
      res => {
       console.log('file uploading', res); 
    }, error => {
      console.log(error);
    });
}

}

export class FileUpload {
  file: File;
}
