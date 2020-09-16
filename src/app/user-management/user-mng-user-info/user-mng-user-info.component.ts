import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../share/service/modal.service';
import { UserMngUserInfoAddFormComponent } from '../user-mng-user-info-add-form/user-mng-user-info-add-form.component';
import { UserMngUserInfoAddComponent } from '../user-mng-user-info-add/user-mng-user-info-add.component';
import { BTN_ROLES } from '../../share/constants/common.const';

@Component({
  selector: 'app-user-mng-user-info',
  templateUrl: './user-mng-user-info.component.html',
  styleUrls: ['./user-mng-user-info.component.css']
})
export class UserMngUserInfoComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  add() {
    this.modalService.open({
      content: UserMngUserInfoAddComponent,
      callback: _response => {
        if(_response) {
          if(_response && _response.close === BTN_ROLES.SAVE) {
           
          }
        }
      }
    });
  }

}
