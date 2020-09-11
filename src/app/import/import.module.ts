import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportProdComponent } from './import-prod/import-prod.component';
import { MShareModule } from '../share/mshare/mshare.module';
import { ImportRoutingModule } from './import-routing.module';



@NgModule({
  declarations: [
    ImportProdComponent
  ],
  imports: [
    MShareModule,
    ImportRoutingModule
  ]
})
export class ImportModule { }
