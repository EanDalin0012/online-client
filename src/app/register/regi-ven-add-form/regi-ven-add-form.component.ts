import { Component, Input, OnInit } from '@angular/core';
import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-regi-ven-add-form',
  templateUrl: './regi-ven-add-form.component.html',
  styleUrls: ['./regi-ven-add-form.component.css']
})
export class RegiVenAddFormComponent implements OnInit {
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

  @Input() public vendor_form: any;


  btnTextDelete() {

  }
}
