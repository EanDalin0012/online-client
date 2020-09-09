import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportComponent } from './export/export.component';
import { MShareModule } from '../share/mshare/mshare.module';



@NgModule({
  declarations: [

  ],
  imports: [
    MShareModule
  ]
})
export class ExportModule { }
