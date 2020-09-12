import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../share/service/server.service';
import { UserAccountRequest } from '../../share/model/request/classtr-req-user-account';
import { UserAccountRespnonse } from '../../share/model/response/classtr-res-user-account';
import { BTN_ROLES } from '../../share/constants/common.const';

@Component({
  selector: 'app-user-mng-acc-edit',
  templateUrl: './user-mng-acc-edit.component.html',
  styleUrls: ['./user-mng-acc-edit.component.css']
})
export class UserMngAccEditComponent implements OnInit {

  modal;
  enabled: boolean = false;
  accountExpired: boolean = false;
  credentialsExpired: boolean = false;
  accountLocked: boolean = false;
  userName: string;
  id: number;

  constructor(
    private service: ServerService
  ) { }

  ngOnInit(): void {
    if (this.modal) {
      this.enabled             = this.modal.message.enabled;
      this.accountExpired     = this.modal.message.account_expired;
      this.accountLocked        = this.modal.message.account_locked;
      this.credentialsExpired = this.modal.message.credentials_expired;
      this.userName           = this.modal.message.user_name;
      this.id                 = this.modal.message.id;
    }
  }

  close() {
    this.modal.close();
  }

  save() {
    const trReq = new UserAccountRequest();
    trReq.body.accountExpired     = this.accountExpired;
    trReq.body.enabled            = this.enabled;
    trReq.body.accountLocked      = this.accountLocked;
    trReq.body.credentialsExpired = this.credentialsExpired;
    trReq.body.userName           = this.userName;
    trReq.body.id                 = this.id;
    console.log(trReq);
    const api = '/api/user/account/update'
    this.service.HTTPRequest(api, trReq).then(resp => {
      const response   = resp as UserAccountRespnonse;
      if (response.body.isSuccessYN === 'Y') {
        this.modal.close({close: BTN_ROLES.EDIT});
      }
    });
  }
}
