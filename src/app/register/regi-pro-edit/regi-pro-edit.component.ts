import { Component, OnInit } from '@angular/core';
import { ButtonRole, ResponseStatus } from '../../share/constants/common.const';
import { CategoryModel } from '../../share/model/model/category';
import { DropDownFilterSettings } from '@progress/kendo-angular-dropdowns';
import { RequestDataService } from '../../share/service/get-data.service';
import { FileRestrictions, FileState, SelectEvent } from '@progress/kendo-angular-upload';
import * as moment from 'moment';
import { Base64WriteImage } from '../../share/model/model/base64';
import { UploadService } from '../../share/service/upload.service';
import { environment } from '../../../environments/environment.stage';
import { Utils } from '../../share/utils/utils.static';
import { ProductModelRequest } from '../../share/model/request/req-product';
import { ServerService } from '../../share/service/server.service';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { ModalService } from '../../share/service/modal.service';
@Component({
  selector: 'app-regi-pro-edit',
  templateUrl: './regi-pro-edit.component.html',
  styleUrls: ['./regi-pro-edit.component.css']
})
export class RegiProEditComponent implements OnInit {
  modal;
  image_uploaded: boolean;

  cagetList = new Array<CategoryModel>();
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
  product_name: string;
  product_id: number;
  categoryModel: CategoryModel;
  category_id: number;
  description:string;
  resource_img_id: string;
  is_selected_file =false;
  url: string;


  filterSettings: DropDownFilterSettings = {
    caseSensitive: false,
    operator: 'startsWith'
  };

  public imagePreviews: any[] = [];
  public fileRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png']
  };

  // grid

  // end grid
  constructor(
    private dataService: RequestDataService,
    private uploadService: UploadService,
    private serverService: ServerService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.url = environment.bizServer.server +'/api/web/reader/v1/read/';
    if(this.modal) {
        console.log(this.modal.message);
        this.category_id = this.modal.message.category_id;
        this.product_name = this.modal.message.name;
        this.description  = this.modal.message.description;
        this.resource_img_id = this.modal.message.resource_img_id;
        this.product_id      = this.modal.message.id;
        console.log(this.resource_img_id);

    }

    this.inquiryCategory();
  }

  // dear function
  close() {
    this.modal.close( {close: ButtonRole.close});
  }

  onClickBtnMainCategoryName() {
    this.product_name = undefined;
  }

  onClickBtndescription() {
    this.description = undefined;
  }

  inquiryCategory() {
    this.dataService.inquiryCategory().then(resp=>{
      console.log(resp);
      this.cagetList = resp as any;
      this.cagetList.forEach(element => {
        if(element.id === this.category_id) {
          this.categoryModel = element;
        }
      });
    });
  }

   //end dear function

  // file select function
  public selectEventHandler(e: SelectEvent): void {
    this.image_uploaded = false;
    this.imagePreviews = [];
    const that = this;
    e.files.forEach((file) => {
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
        that.imagePreviews.unshift(image);
        };
        reader.readAsDataURL(file.rawFile);
    }

    });
    this.is_selected_file = true;
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
      this.image_uploaded = false;
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
            this.uploadService.upload(base64WriteImage).then(resp=>{
              if(resp === true) {
                this.resource_img_id = base64WriteImage.id;
                this.image_uploaded = true;
                console.log('resource_img_id', this.resource_img_id);

              }
            });

          }
      } else {
      }
    });
  }

}
// end file select function

edit() {
  if ( this.isValid() === true) {
    const userInfo                = Utils.getUserInfo();
    const trReq                   = new ProductModelRequest();
    trReq.body.id                 = this.product_id;
    trReq.body.name               = this.product_name;
    trReq.body.description        = this.description;
    trReq.body.category_id        = this.categoryModel.id;
    trReq.body.resource_img_id    = this.resource_img_id;

    const api = '/api/product/v1/update';
    console.log(trReq);
    this.serverService.HTTPPost(api, trReq).then(response => {
      const responseData = response as ResponseDataModel;
      if ( responseData && responseData.body.status === ResponseStatus.Y) {
        this.modal.close( {close: ButtonRole.edit});
      }
    });
  }
}

private isValid(): boolean {
  console.log(this.categoryModel);

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

}
