import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiCateComponent } from './regi-cate/regi-cate.component';
import { RegiCateAddComponent } from './regi-cate-add/regi-cate-add.component';
import { RegiCateEditComponent } from './regi-cate-edit/regi-cate-edit.component';
import { RegiProComponent } from './regi-pro/regi-pro.component';
import { RegiProAddComponent } from './regi-pro-add/regi-pro-add.component';
import { RegiProEditComponent } from './regi-pro-edit/regi-pro-edit.component';
import { RegiVenComponent } from './regi-ven/regi-ven.component';
import { RegiVenAddComponent } from './regi-ven-add/regi-ven-add.component';
import { RegiVenEditComponent } from './regi-ven-edit/regi-ven-edit.component';
import { RegiCustComponent } from './regi-cust/regi-cust.component';
import { RegiCustAddComponent } from './regi-cust-add/regi-cust-add.component';
import { RegiCustEditComponent } from './regi-cust-edit/regi-cust-edit.component';
import { MShareModule } from '../share/mshare/mshare.module';
import { RegisterRoutingModule } from './register-routing.module';



@NgModule({
  declarations: [
    RegiCateComponent,
    RegiCateAddComponent,
    RegiCateEditComponent,
    RegiProComponent,
    RegiProAddComponent,
    RegiProEditComponent,
    RegiVenComponent,
    RegiVenAddComponent,
    RegiVenEditComponent,
    RegiCustComponent,
    RegiCustAddComponent,
    RegiCustEditComponent
  
  ],
  imports: [
    MShareModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
