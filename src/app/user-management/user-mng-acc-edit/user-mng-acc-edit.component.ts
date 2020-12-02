import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../share/service/server.service';
import { UserAccountRequest } from '../../share/model/request/req-user-account';
import { UserAccountRespnonse } from '../../share/model/response/res-user-account';
import { BTN_ROLES } from '../../share/constants/common.const';
import { AccountInfoByIdRequest } from '../../share/model/request/account-get-info';

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
      console.log(this.modal);
      this.inquiry(this.modal.message.account_id);
      // this.enabled             = this.modal.message.enabled;
      // this.accountExpired     = this.modal.message.account_expired;
      // this.accountLocked        = this.modal.message.account_locked;
      // this.credentialsExpired = this.modal.message.credentials_expired;
      // this.userName           = this.modal.message.user_name;
      // this.id                 = this.modal.message.id;
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
    this.service.HTTPPost(api, trReq).then(resp => {
      const response   = resp as UserAccountRespnonse;
      if (response.body.isSuccessYN === 'Y') {
        this.modal.close({close: BTN_ROLES.EDIT});
      }
    });
  }

  inquiry(id: number) {

    let data = new AccountInfoByIdRequest();
    data.body.account_id = id;

    const api ='/api/user/account/account_id';

    this.service.HTTPPost(api, data).then(resp=> {
      console.log(resp);
      if(resp.body) {
        this.enabled            = resp.body.enabled;
        this.accountExpired     = resp.body.account_expired;
        this.accountLocked      = resp.body.account_locked;
        this.credentialsExpired = resp.body.credentials_expired;
        this.userName           = resp.body.user_name;
        this.id                 = resp.body.id;
      }
    });

  }
}
