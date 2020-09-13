import { NgModule } from '@angular/core';
import { MShareModule } from '../share/mshare/mshare.module';
import { ExportRoutingModule } from './export-routing.module';



@NgModule({
  declarations: [

  ],
  imports: [
    MShareModule,
    ExportRoutingModule
  ]
})
export class ExportModule { }
