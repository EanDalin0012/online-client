import { Component, OnInit } from '@angular/core';
import { BTN_ROLES, Reponse_Status } from '../../share/constants/common.const';
import { VendorRequestModel } from '../../share/model/request/req-vendor';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { VendorModel } from '../../share/model/model/vendor';
import { TranslateService } from '@ngx-translate/core';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';

@Component({
  selector: 'app-regi-ven-edit',
  templateUrl: './regi-ven-edit.component.html',
  styleUrls: ['./regi-ven-edit.component.css']
})
export class RegiVenEditComponent implements OnInit {

  modal;
  typeList: any[] = [];
  vendorModel = new VendorModel();
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
      const trReq                   = new VendorRequestModel();
      trReq.body                    = this.vendorModel;

      const api = '/api/category/save';
      this.serverService.HTTPRequest(api, trReq).then(response => {
        const responseData = response as ResponseDataModel;
        if ( responseData && responseData.body.status === Reponse_Status.Y) {
          this.modal.close( {close: BTN_ROLES.SAVE});
        }
      });
    }
}

private isValid(): boolean {
  if (!this.vendorModel.name || this.vendorModel.name.trim() === '' || this.vendorModel.name === null) {
        const bool = this.modalService.messageAlert(this.translateTxt.MESSAGE_ERROR.MAIN_CATEGORY_REQUEIRED);
        return bool;
  } else {
    return true;
  }
}

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  btnX(value) {

  }

}
