import { Component, OnInit } from '@angular/core';
import { BTN_ROLES } from '../../share/constants/common.const';

@Component({
  selector: 'app-regi-pro-detail-views',
  templateUrl: './regi-pro-detail-views.component.html',
  styleUrls: ['./regi-pro-detail-views.component.css']
})
export class RegiProDetailViewsComponent implements OnInit {
  modal;
  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

}
