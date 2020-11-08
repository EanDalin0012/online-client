import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regi-pro-edit',
  templateUrl: './regi-pro-edit.component.html',
  styleUrls: ['./regi-pro-edit.component.css']
})
export class RegiProEditComponent implements OnInit {
  modal;

  constructor() { }

  ngOnInit(): void {
      if(this.modal) {
        console.log(this.modal.message);
      }
  }

}
