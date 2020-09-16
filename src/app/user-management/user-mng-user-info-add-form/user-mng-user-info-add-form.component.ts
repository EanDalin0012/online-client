import { Component, Input, OnInit } from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-mng-user-info-add-form',
  templateUrl: './user-mng-user-info-add-form.component.html',
  styleUrls: ['./user-mng-user-info-add-form.component.css']
})
export class UserMngUserInfoAddFormComponent implements OnInit {
  first_name: string;
  last_name: string;
  constructor() { }

  ngOnInit(): void {
  }

  public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public restrictions: FileRestrictions = {
      allowedExtensions: ['jpg', 'jpeg', 'png']
  };

  @Input() public userForm: any;


  btnTextDelete() {

  }

}
