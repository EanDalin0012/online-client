import { Component, OnInit } from '@angular/core';
import { VendorModel } from '../../share/model/model/vendor';
import { TranslateService } from '@ngx-translate/core';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { VendorRequestModel } from '../../share/model/request/req-vendor';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { ResponseStatus, BTN_ROLES } from '../../share/constants/common.const';
import { FormaterInputService } from '../../share/service/formater-input.service';

@Component({
  selector: 'app-regi-ven-add',
  templateUrl: './regi-ven-add.component.html',
  styleUrls: ['./regi-ven-add.component.css']
})
export class RegiVenAddComponent implements OnInit {

  modal;
  typeList: any[] = [];
  vendorModel = new VendorModel();
  translateTxt: any;
  contact: string;
  other_contact: string;

  constructor(
    private translate: TranslateService,
    private serverService: ServerService,
    private modalService: ModalService,
    private inputService: FormaterInputService
  ) { }

  ngOnInit() {
  }

  btnRegister() {
    if ( this.isValid() === true) {
      const trReq                   = new VendorRequestModel();
      trReq.body                    = this.vendorModel;
      console.log(trReq);
      const api = '/api/vendor/v1/save';
      this.serverService.HTTPPost(api, trReq).then(response => {
        const responseData = response as ResponseDataModel;
        if ( responseData && responseData.body.status === ResponseStatus.Y) {
          this.modal.close( {close: BTN_ROLES.SAVE});
        }
      });
    }
}

inputContact(event) {
  const data = this.inputService.formatPhoneNumber(event);
  if(data) {
    this.vendorModel.contact = data.value;
  }

}

inputOtherContact(event) {
  const data = this.inputService.formatPhoneNumber(event);
  if(data) {
    this.vendorModel.other_contact = data.value;
  }

}

private isValid(): boolean {
  if (!this.vendorModel.name || this.vendorModel.name.trim() === '' || this.vendorModel.name === null) {
        const bool = this.modalService.messageAlert(this.translate.instant('RegiVenAdd.Message.Vendor_Name_Empty'));
        return bool;
  } else if (!this.vendorModel.contact || this.vendorModel.contact.trim() === '' || this.vendorModel.contact === null) {
    const bool = this.modalService.messageAlert(this.translate.instant('RegiVenAdd.Message.Vendor_Contact_Empty'));
    return bool;
  }
  return true;
}

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  btnX(value) {
    switch(value) {
      case 'name':
        this.vendorModel.name = undefined;
        break;
      case 'contact':
        this.vendorModel.contact = undefined;
        this.contact = undefined;
        break;
      case 'email':
        this.vendorModel.email = undefined;
        break;
      case 'address':
        this.vendorModel.address = undefined;
        break;
      case 'description':
        this.vendorModel.description = undefined;
        break;
      case 'other_contact':
        this.vendorModel.other_contact = undefined;
        this.other_contact = undefined;
        break;

    }
  }

}
