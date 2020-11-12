import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MShareModule } from '../../mshare/mshare.module';



@NgModule({
  declarations: [
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    MShareModule
  ],
  entryComponents: [
    AlertDialogComponent
  ],
})
export class ComponentModule { }
