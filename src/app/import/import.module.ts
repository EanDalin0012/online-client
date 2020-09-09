import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportProdComponent } from './import-prod/import-prod.component';
import { MShareModule } from '../share/mshare/mshare.module';



@NgModule({
  declarations: [
    ImportProdComponent
  ],
  imports: [
    MShareModule
  ]
})
export class ImportModule { }
