import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChunkSettings, ClearEvent, FileInfo, FileRestrictions, RemoveEvent, SelectEvent, SuccessEvent, UploadEvent } from '@progress/kendo-angular-upload';

import { environment } from 'src/environments/environment';
import { ProductModel } from '../../share/model/model/product';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { RequestDataService } from '../../share/service/get-data.service';
import { ProductModelRequest } from '../../share/model/request/req-product';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { Reponse_Status, BTN_ROLES, LOGO_FILE_EXT } from '../../share/constants/common.const';
import { CategoryModel } from '../../share/model/model/category';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
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
  public imagePreviews: any;
  public uploadRemoveUrl = 'removeUrl';
  userinfo: any;

  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: LOGO_FILE_EXT
  };

  public uploadSaveUrl: string;

  selectedFile: File;
  message: string;
  userInfo: any;

  api = '/api/file/upload/product';
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

  constructor(
    private serverService: ServerService,
    private translate: TranslateService,
    private modalService: ModalService,
    private dataService: RequestDataService
  ) { }

  ngOnInit() {
    this.uploadSaveUrl = environment.bizMOBServer + ''+ this.api;
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
      this.serverService.HTTPRequest(api, trReq).then(rest => {
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

  public onSelect(ev: SelectEvent): void {
    ev.files.forEach((file: FileInfo) => {
      if (file.rawFile) {
        const reader = new FileReader();

        reader.onloadend = () => {
          this.imagePreviews = { src: String(reader.result) };
        };

        reader.readAsDataURL(file.rawFile);
      }
    });

  }

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

  public onClear(ev: ClearEvent): void {
    this.imagePreviews = null;
  }

  successEventHandler(e: SuccessEvent) {
    console.log('response file update', e);
    const responseData = e.response.body;
    if (responseData) {
      if  (responseData.header.result === true) {
        this.resourceFileInfoId = responseData.body.id;
        const url = e.response.body.body.imageURL;
      }
    }
  }

  uploadEventHandler(e: UploadEvent) {
    console.log(e);
    e.data = {
      userID : 1,
      productId: 1,
      fileImageURL: environment.bizMOBServer ,
      file : e.files[0].rawFile
    };
  }

}
