import { Component, OnInit } from '@angular/core';
import { MainCategory } from '../../share/model/model/main-category';
import { TranslateService } from '@ngx-translate/core';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { Utils } from '../../share/utils/utils.static';
import { BTN_ROLES, Reponse_Status } from '../../share/constants/common.const';
import { MainCategoryRequest } from '../../share/model/request/req-main-category';
import { ResponseDataModel } from '../../share/model/response/res-data';

@Component({
  selector: 'app-regi-cate-add',
  templateUrl: './regi-cate-add.component.html',
  styleUrls: ['./regi-cate-add.component.css']
})
export class RegiCateAddComponent implements OnInit {

  modal;
  typeList: any[] = [];
  mainCategory: MainCategory;
  mainCategoryName: string;
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
      const trReq                   = new MainCategoryRequest();
      trReq.body.name   = this.mainCategoryName;
      trReq.body.description        = this.description;
      trReq.body.createBy           = userInfo.id;
      trReq.body.modifyBy           = userInfo.id;
      const api = '/api/main/category/save';
      this.serverService.HTTPRequest(api, trReq).then(response => {
        const responseData = response as ResponseDataModel;
        if ( responseData && responseData.body.status === Reponse_Status.Y) {
          this.modal.close( {close: BTN_ROLES.SAVE});
        }
      });
    }
}

private isValid(): boolean {
  if (!this.mainCategoryName || this.mainCategoryName && this.mainCategoryName.trim() === ''
      || this.mainCategoryName && this.mainCategoryName === null) {
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
      this.mainCategoryName = undefined;
  }

  onClickBtndescription() {
    this.description = undefined;
  }

}
