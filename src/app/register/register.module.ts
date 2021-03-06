import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { RegiVenAddFormComponent } from './regi-ven-add-form/regi-ven-add-form.component';
import { RegiVenAddFormAddressComponent } from './regi-ven-add-form-address/regi-ven-add-form-address.component';
import { RegiProDetailAddComponent } from './regi-pro-detail-add/regi-pro-detail-add.component';
import { RegiProDetailEditComponent } from './regi-pro-detail-edit/regi-pro-detail-edit.component';
import { RegiProDetailViewsComponent } from './regi-pro-detail-views/regi-pro-detail-views.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { CategoryComponent } from './category/category.component';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';



@NgModule({
  declarations: [
    RegiProComponent,
    RegiProAddComponent,
    RegiProEditComponent,
    RegiVenComponent,
    RegiVenAddComponent,
    RegiVenEditComponent,
    RegiCustComponent,
    RegiCustAddComponent,
    RegiCustEditComponent,
    RegiVenAddFormComponent,
    RegiVenAddFormAddressComponent,
    RegiProDetailAddComponent,
    RegiProDetailEditComponent,
    RegiProDetailViewsComponent,
    CategoryComponent,
    CategoryAddComponent,
    CategoryEditComponent

  ],
  imports: [
    MShareModule,
    CKEditorModule,
    ScrollViewModule,
    RegisterRoutingModule
  ],
  exports: [
    RegiVenAddFormComponent,
    RegiVenAddFormAddressComponent
  ]
})
export class RegisterModule { }
