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
  ],
  imports: [
    CommonModule
  ]
})
export class UserManagementModule { }
