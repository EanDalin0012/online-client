import { Component, Input, OnInit } from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-mng-user-info-add-account',
  templateUrl: './user-mng-user-info-add-account.component.html',
  styleUrls: ['./user-mng-user-info-add-account.component.css']
})
export class UserMngUserInfoAddAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public restrictions: FileRestrictions = {
      allowedExtensions: ['jpg', 'jpeg', 'png']
  };

  @Input() public accountForm: FormGroup;

}
