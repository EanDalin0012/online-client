import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../share/model/model/category';
import { TranslateService } from '@ngx-translate/core';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { Utils } from '../../share/utils/utils.static';
import { CategoryRequestModel } from '../../share/model/request/req-main-category';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { Reponse_Status, BTN_ROLES } from '../../share/constants/common.const';

@Component({
  selector: 'app-regi-cate-edit',
  templateUrl: './regi-cate-edit.component.html',
  styleUrls: ['./regi-cate-edit.component.css']
})
export class RegiCateEditComponent implements OnInit {

  modal;
  typeList: any[] = [];
  categoryModel: CategoryModel;
  category_name: string;
  description: string;
  id: number;

  translateTxt: any;
  constructor(
    private translate: TranslateService,
    private serverService: ServerService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.translate.get('Home7100').subscribe((res) => {
      this.translateTxt = res;
     });
     if(this.modal) {
        this.category_name = this.modal.message.name;
        this.description   = this.modal.message.description;
        this.id             = this.modal.message.id;
     }
  }

  btnRegister() {
    if ( this.isValid() === true) {
      const trReq                   = new CategoryRequestModel();
      trReq.body.name               = this.category_name;
      trReq.body.description        = this.description;
      trReq.body.id                 = this.id;
      const api = '/api/category/v1/update';
      this.serverService.HTTPPost(api, trReq).then(response => {
        const responseData = response as ResponseDataModel;
        if ( responseData && responseData.body.status === Reponse_Status.Y) {
          this.modal.close( {close: BTN_ROLES.EDIT});
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

}
