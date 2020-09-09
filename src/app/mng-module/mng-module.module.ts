import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRoutingModule } from './mng-routing.module';
import { RegiComponent } from '../register/regi/regi.component';
import { ImportComponent } from '../import/import/import.component';
import { ExportComponent } from '../export/export/export.component';
import { HomeComponent } from '../home/home/home.component';
import { UserManagementComponent } from '../user-management/user-management/user-management.component';



@NgModule({
  declarations: [
    RegiComponent,
    ImportComponent,
    ExportComponent,
    HomeComponent,
    RegiComponent,
    UserManagementComponent

  ],
  imports: [
    CommonModule,
    ManageRoutingModule
  ]
})
export class MngModuleModule { }
