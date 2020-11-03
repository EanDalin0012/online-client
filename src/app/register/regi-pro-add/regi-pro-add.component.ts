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
import { Base64WriteImage } from '../../share/model/model/base64';
import { UploadService } from '../../share/service/upload.service';
import * as moment from 'moment';
import { CategoryRequestModel } from '../../share/model/request/req-main-category';
import { Utils } from '../../share/utils/utils.static';
import { Country, CountryData } from '../../home/home1000/data';
import { DataService } from '../../share/service/data.service';

@Component({
  selector: 'app-regi-pro-add',
  templateUrl: './regi-pro-add.component.html',
  styleUrls: ['./regi-pro-add.component.css']
})
export class RegiProAddComponent implements OnInit {
  
  modal;
  typeList: any[] = [];
  categoryModel: CategoryModel;
  category_name: string;
  description: string;

  translateTxt: any;


// file select declear
   public imagePreviews: any[] = [];
   public fileRestrictions: FileRestrictions = {
       allowedExtensions: ['.jpg', '.png']
   };
   i = 0;
// end file select declear
// category info
defaultCountry = {  
  id: 0,
  name: 'Select Cagetory',
  description: '',
  create_by: 0,
  modify_by: 0,
  create_date: '',
  modify_date: '',
  status: ''
};
filterSettings: DropDownFilterSettings = {
  caseSensitive: false,
  operator: 'startsWith'
};
cagetList = new Array<CategoryModel>();
country: CategoryModel;

// end 

  constructor(
    private translate: TranslateService,
    private serverService: ServerService,
    private modalService: ModalService,
    private uploadService: UploadService,
    private dataService: RequestDataService
  ) { }

  ngOnInit() {
    this.translate.get('Home7100').subscribe((res) => {
      this.translateTxt = res;
     });
     this.inquiryCategory();
  }

  btnRegister() {
    if ( this.isValid() === true) {
      const userInfo                = Utils.getUserInfo();
      const trReq                   = new CategoryRequestModel();
      trReq.body.name               = this.category_name;
      trReq.body.description        = this.description;
      const api = '/api/category/save';
      this.serverService.HTTPPost(api, trReq).then(response => {
        const responseData = response as ResponseDataModel;
        if ( responseData && responseData.body.status === Reponse_Status.Y) {
          this.modal.close( {close: BTN_ROLES.SAVE});
        }
      });
    }
}

private isValid(): boolean {
  if (!this.category_name || this.category_name && this.category_name.trim() === ''
      || this.category_name && this.category_name === null) {
        const bool = this.modalService.messageAlert(this.translateTxt.MESSAGE_ERROR.MAIN_CATEGORY_REQUEIRED);
        return bool;
  } else {
    return true;
  }
}

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  onClickBtnMainCategoryName() {
      this.category_name = undefined;
  }

  onClickBtndescription() {
    this.description = undefined;
  }

  // file select function
  public selectEventHandler(e: SelectEvent): void {
    this.imagePreviews = [];
    const that = this;
    e.files.forEach((file) => {
    console.log('testing', file);
    let imagePreviews1 = [];

    if (!file.validationErrors) {
        const reader = new FileReader();
        reader.onload = function (ev) {
       
        const image = {
            src: ev.target['result']+"",
            uid: file.uid,
            id: file.uid +"-"+moment().format('YYYYMMDDhhmmss'),
            name: file.name,
            size: file.size,
            type: file.rawFile.type,
            extension: file.extension
        };
        imagePreviews1.push(image);
        that.imagePreviews.unshift(image);

        };
        this.i++;
        console.log(this.i);
        console.log(imagePreviews1);
        reader.readAsDataURL(file.rawFile);
        
    }
    
    });
  }
  public remove(fileSelect, uid: string) {
      fileSelect.removeFileByUid(uid);
      if(this.imagePreviews.length > 0) {
        this.imagePreviews.forEach((element,index) =>{
          if(element.uid === uid) {
              console.log("call add function", element, index);
              this.imagePreviews.splice(index, 1);
          }
        });
      }
    }

    public showButton(state: FileState): boolean {
      return (state === FileState.Selected) ? true : false;
    }
    
upload(state) {
  console.log(this.imagePreviews);
  if(this.imagePreviews.length > 0) {
    this.imagePreviews.forEach(element =>{
      if(element.uid === state) {
          let splitted = element.src.split(','); 
          const base64WriteImage = new Base64WriteImage();          
          console.log('splitted', splitted)
          if(splitted[1]) { 
            base64WriteImage.id         = element.id;
            base64WriteImage.base64     = splitted[1];
            base64WriteImage.file_name  = element.name;
            base64WriteImage.file_type  = element.type;
            base64WriteImage.file_size  = element.size;
            base64WriteImage.file_extension = element.extension;
            console.log('abc', base64WriteImage);
  
            this.uploadService.upload(base64WriteImage).then(resp=>{
  
            });

          }
          
         
      } else {
      }
    });
  }
  
}
  // end file select function

  inquiryCategory() {
    this.dataService.inquiryCategory().then(resp=>{
      console.log(resp);
      this.cagetList = resp as any;
    });
  }

}