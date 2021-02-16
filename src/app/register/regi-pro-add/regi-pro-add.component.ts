import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { FileRestrictions, FileState, SelectEvent } from '@progress/kendo-angular-upload';
import * as moment from 'moment';
import { BTN_ROLES, ResponseStatus } from '../../share/constants/common.const';
import { Base64WriteImage } from '../../share/model/model/base64';
import { CategoryModel } from '../../share/model/model/category';
import { ProductModelRequest } from '../../share/model/request/req-product';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { RequestDataService } from '../../share/service/get-data.service';
import { ModalService } from '../../share/service/modal.service';
import { ServerService } from '../../share/service/server.service';
import { UploadService } from '../../share/service/upload.service';
import { Utils } from '../../share/utils/utils.static';

@Component({
  selector: 'app-regi-pro-add',
  templateUrl: './regi-pro-add.component.html',
  styleUrls: ['./regi-pro-add.component.css']
})
export class RegiProAddComponent implements OnInit {

  modal;
  typeList: any[] = [];
  categoryModel: CategoryModel;
  product_name: string;
  description: string;
  resource_img_id: string;
  image_uploaded: boolean;
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
      const trReq                   = new ProductModelRequest();
      trReq.body.name               = this.product_name;
      trReq.body.description        = this.description;
      trReq.body.category_id        = this.categoryModel.id;
      trReq.body.resource_img_id    = this.resource_img_id;

      const api = '/api/product/v1/save';

      this.serverService.HTTPPost(api, trReq).then(response => {
        const responseData = response as ResponseDataModel;
        if ( responseData && responseData.body.status === ResponseStatus.Y) {
          this.modal.close( {close: BTN_ROLES.SAVE});
        }
      });
    }
}

private isValid(): boolean {
  if (!this.product_name || this.product_name && this.product_name.trim() === ''
      || this.product_name && this.product_name === null) {
        const bool = this.modalService.messageAlert('Invalid product name.');
        return bool;
  } else if (!this.categoryModel) {
    const bool = this.modalService.messageAlert('Please select category.');
    return bool;
  }
  else {
    return true;
  }
}

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  onClickBtnMainCategoryName() {
      this.product_name = undefined;
  }

  onClickBtndescription() {
    this.description = undefined;
  }

  // file select function
  public selectEventHandler(e: SelectEvent): void {
    this.image_uploaded = false;
    this.imagePreviews = [];
    const that = this;
    e.files.forEach((file) => {
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
        reader.readAsDataURL(file.rawFile);
    }
    });
  }

  public remove(fileSelect, uid: string) {
      this.image_uploaded = false;
      fileSelect.removeFileByUid(uid);
      if(this.imagePreviews.length > 0) {
        this.imagePreviews.forEach((element,index) =>{
          if(element.uid === uid) {
              this.imagePreviews.splice(index, 1);
          }
        });
      }
    }

    public showButton(state: FileState): boolean {
      return (state === FileState.Selected) ? true : false;
    }

upload(state) {
  if(this.imagePreviews.length > 0) {
    this.imagePreviews.forEach(element =>{
      if(element.uid === state) {
          let splitted = element.src.split(',');
          const base64WriteImage = new Base64WriteImage();
          if(splitted[1]) {
            base64WriteImage.id         = element.id;
            base64WriteImage.base64     = splitted[1];
            base64WriteImage.file_name  = element.name;
            base64WriteImage.file_type  = element.type;
            base64WriteImage.file_size  = element.size + '';
            base64WriteImage.file_extension = element.extension;
            console.log(base64WriteImage);
            this.uploadService.upload(base64WriteImage).then(resp => {
              if(resp === true) {
                this.resource_img_id = base64WriteImage.id;
                this.image_uploaded = true;
              }
            });
          }
      }
    });
  }

}
  // end file select function
  inquiryCategory() {
    this.dataService.inquiryCategory().then(resp=>{
      this.cagetList = resp as any;
    });
  }

}
