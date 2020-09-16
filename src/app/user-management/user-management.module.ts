import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserMngAccComponent } from './user-mng-acc/user-mng-acc.component';
import { UserMngAccEditComponent } from './user-mng-acc-edit/user-mng-acc-edit.component';
import { UserMngUserInfoComponent } from './user-mng-user-info/user-mng-user-info.component';
import { UserMngUserInfoEditComponent } from './user-mng-user-info-edit/user-mng-user-info-edit.component';
import { UserMngUserInfoAddComponent } from './user-mng-user-info-add/user-mng-user-info-add.component';
import { UserMngUserRoleComponent } from './user-mng-user-role/user-mng-user-role.component';
import { UserMngUserRoleAddComponent } from './user-mng-user-role-add/user-mng-user-role-add.component';
import { UserMngUserRoleEditComponent } from './user-mng-user-role-edit/user-mng-user-role-edit.component';
import { UserMngAuthComponent } from './user-mng-auth/user-mng-auth.component';
import { UserMngAuthAddComponent } from './user-mng-auth-add/user-mng-auth-add.component';
import { UserMngAuthEditComponent } from './user-mng-auth-edit/user-mng-auth-edit.component';
import { UserMngAuthRoleComponent } from './user-mng-auth-role/user-mng-auth-role.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { MShareModule } from '../share/mshare/mshare.module';
import { UserMngClientDetailsComponent } from './user-mng-client-details/user-mng-client-details.component';
import { UserMngClientDetailsAddComponent } from './user-mng-client-details-add/user-mng-client-details-add.component';
import { UserMngClientDetailsEditComponent } from './user-mng-client-details-edit/user-mng-client-details-edit.component';
import { UserMngUserInfoAddFormComponent } from './user-mng-user-info-add-form/user-mng-user-info-add-form.component';
import { UserMngUserInfoAddImageComponent } from './user-mng-user-info-add-image/user-mng-user-info-add-image.component';
import { UserMngUserInfoAddAccountComponent } from './user-mng-user-info-add-account/user-mng-user-info-add-account.component';



@NgModule({
  declarations: [
   UserMngAccComponent,
   UserMngAccEditComponent,
   UserMngUserInfoComponent,
   UserMngUserInfoEditComponent,
   UserMngUserInfoAddComponent,
   UserMngUserRoleComponent,
   UserMngUserRoleAddComponent,
   UserMngUserRoleEditComponent,
   UserMngAuthComponent,
   UserMngAuthAddComponent,
   UserMngAuthEditComponent,
   UserMngAuthRoleComponent,
   UserMngClientDetailsComponent,
   UserMngClientDetailsAddComponent,
   UserMngClientDetailsEditComponent,
   UserMngUserInfoAddFormComponent,
   UserMngUserInfoAddImageComponent,
   UserMngUserInfoAddAccountComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MShareModule
  ],
  exports: [
    UserMngUserInfoAddFormComponent,
    UserMngUserInfoAddImageComponent,
    UserMngUserInfoAddAccountComponent,
  ]
})
export class UserManagementModule { }
