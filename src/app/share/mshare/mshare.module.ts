import { CommonModule, DatePipe } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule, DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule, SharedModule } from '@progress/kendo-angular-dropdowns';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SortableModule } from '@progress/kendo-angular-sortable';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UploadModule, UploadsModule } from '@progress/kendo-angular-upload';
import { ModalComponent } from '../component/modal/modal.component';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { PhoneNumberPipe } from '../pipe/phone-number.pipe';
import { DateFormatPipe } from '../pipe/date-format.pipe';
import { SrcPipe } from '../pipe/src.pipe';
import { GenderPipe } from '../pipe/gender.pipe';
import { SanitizeHtmlPipe } from '../pipe/sanitize-html.pipe';

@NgModule({
  declarations: [
    ModalComponent,
    PhoneNumberPipe,
    SrcPipe,
    DateFormatPipe,
    GenderPipe,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    DialogModule,
    GridModule,
    LayoutModule,
    SharedModule,
    SortableModule,
    DropDownsModule,
    UploadsModule,
    PDFModule,
    DialogsModule,
    UploadModule,
    InputsModule,
    NotificationModule,
    SchedulerModule,
    PDFExportModule,
    ExcelExportModule,
    ChartsModule,
    DateInputsModule,
    ButtonsModule,
    ProgressBarModule,
    PhoneNumberPipe,
    DateFormatPipe,
    SrcPipe,
    GenderPipe,
    SanitizeHtmlPipe
  ],
  entryComponents: [
    ModalComponent,
  ],
  providers: [
    DatePipe,
  ]
})
export class MShareModule {
  static forRoot(): ModuleWithProviders<MShareModule> {
    return {
      ngModule: MShareModule,
      providers: []
    };
  }
}
