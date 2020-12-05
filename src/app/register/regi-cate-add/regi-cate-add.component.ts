import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { Utils } from '../../share/utils/utils.static';
import { BTN_ROLES, Reponse_Status } from '../../share/constants/common.const';
import { CategoryRequestModel } from '../../share/model/request/req-main-category';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { CategoryModel } from '../../share/model/model/category';

@Component({
  selector: 'app-regi-cate-add',
  templateUrl: './regi-cate-add.component.html',
  styleUrls: ['./regi-cate-add.component.css']
})
export class RegiCateAddComponent implements OnInit {

  modal;
  typeList: any[] = [];
  categoryModel: CategoryModel;
  category_name: string;
  description: string;

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
  }

  btnRegister() {
    if ( this.isValid() === true) {
      const userInfo                = Utils.getUserInfo();
      const trReq                   = new CategoryRequestModel();
      trReq.body.name               = this.category_name;
      trReq.body.description        = this.description;
      const api = '/api/category/v1/save';
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

}
