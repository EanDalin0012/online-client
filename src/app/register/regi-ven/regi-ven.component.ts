import { Component, OnInit } from '@angular/core';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/page-change-event';
import { GridDataResult, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { VendorModel } from '../../share/model/model/vendor';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { DataService } from '../../share/service/data.service';
import { Title } from '@angular/platform-browser';
import { RequestDataModel } from '../../share/model/request/req-data';
import { VendorResponseModel } from '../../share/model/response/res-vendor';
import { RegiVenAddComponent } from '../regi-ven-add/regi-ven-add.component';
import { BTN_ROLES, ResponseStatus } from '../../share/constants/common.const';
import { RegiVenEditComponent } from '../regi-ven-edit/regi-ven-edit.component';
import { TranslateService } from '@ngx-translate/core';
import { ObjIdDeleteRequest } from '../../share/model/request/req-obj-delete';
import { ObjIdModel } from '../../share/model/model/obj-id';
import { ResponseDataModel } from '../../share/model/response/res-data';

@Component({
  selector: 'app-regi-ven',
  templateUrl: './regi-ven.component.html',
  styleUrls: ['./regi-ven.component.css']
})
export class RegiVenComponent implements OnInit {

  // start declear grid
public info = true;
public buttonCount = 5;
public type: 'numeric' | 'input' = 'numeric';
public previousNext = false;
public pageSizes: any[] = [10, 20, 30, 50, 100];
public group: any[] = [{
  field: ''
}];
public multiple = false;
public allowUnsort = true;
public height = 'auto';
search: string;
public sort: SortDescriptor[] = [{
  field: 'id',
  dir: 'asc'
}];
public gridView: GridDataResult;
public gridData: any[];
public checkboxOnly = false;
public mode = 'multiple';
gridheight = screen.height * 0.5;
public selectedCallback = (args) => args.dataItem;
public selectableSettings: SelectableSettings;
public skip = 0;
public pageSize = 10;
public mySelection: any[] = [];
// end declear grid

// declear variable
vendor_list = new Array<VendorModel>();
totalRecord: number;
data = new Array<VendorModel>();
obj_Id_model_list = new Array<ObjIdModel>();

  constructor(
    private service: ServerService,
    private modalService: ModalService,
    private dataService: DataService,
    private titleService: Title,
    private translateService: TranslateService
  ) {
    this.titleService.setTitle('Vendor');
    this.setSelectableSettings();
  }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    this.dataService.visitMessage(url[5]);
    this.inquiry();
  }

  // declear function
  inquiry() {
    const trReq = new RequestDataModel();
    const api = '/api/vendor/v1/list';
    this.service.HTTPGet(api).then(resp => {
      const response   = resp as VendorResponseModel;
      if (response) {
        this.vendor_list = response.body;
        this.data          = response.body;
        this.loadingData(this.vendor_list);
      }
    });
  }
  delete() {
    if(this.mySelection.length > 0) {
      let name = '';
      let i = 0;
      this.mySelection.forEach(element => {
          const mainCategoryName = this.getNameById(element);
          if (mainCategoryName !== '') {
            if (i === this.mySelection.length - 1) {
              name += mainCategoryName;
            } else {
              name += mainCategoryName  + ', ';
            }
          }

          this.obj_Id_model_list.push({
            id: Number(element)
          });

          ++i;
      });

      this.modalService.confirm({
        title: 'Delete Item(s)',
        content: 'Your select item(s) is: '+name,
        lBtn: {btnText: 'Close'},
        rBtn: {btnText: 'Confirm'},
        modalClass: ['pop-confirm-btn dialog-confirm pop-dialog-confirm pop-dialog-close'],
        callback: response =>{
          console.log('response', response);
          if(response.text = 'Confirm') {
            this.doDelete();
          }
        }
      });
    } else {
      this.modalService.alert({
        title: this.translateService.instant('COMMON.LABEL.Delete_Items'),
        content: '<h2>'+this.translateService.instant('COMMON.LABEL.Please_Select_Item_You_Delete')+'</h2>',
        btnText: this.translateService.instant('COMMON.BUTTON.CONFIRME'),
        callback: response =>{

        }
      });
    }
  }

  getNameById(val: number): string {
    let name = '';
    this.vendor_list.forEach(element => {
      if (element.id === val) {
        name = element.name ; // + '(' + element.id + ')';
      }
    });
    return name;
  }

  doDelete() {
    const trReq = new ObjIdDeleteRequest();
    trReq.body = this.obj_Id_model_list;

    const api = '/api/vendor/v1/delete';
    this.service.HTTPPost(api, trReq).then(resp => {
      const response   = resp as ResponseDataModel;
      if (response.body.status === ResponseStatus.Y) {
        this.modalService.showNotificationService(this.translateService.instant('RegiVen.Message.Vendor_Delete_Success'));
        this.inquiry();
      }
    });
  }

  add() {
    this.modalService.open({
      content: RegiVenAddComponent,
      callback: response =>{
        if(response.close === BTN_ROLES.SAVE) {
          this.modalService.showNotificationService(this.translateService.instant('RegiVen.Message.Vendor_Save_Success'));
          this.inquiry();
        }
      }
    });
  }

  edit(dataItems) {
    this.modalService.open({
      content: RegiVenEditComponent,
      message: dataItems,
      callback: response =>{
        if(response.close === BTN_ROLES.EDIT) {
          this.modalService.showNotificationService(this.translateService.instant('RegiVen.Message.Vendor_Update_Success'));
          this.inquiry();
        }
      }
    });
  }


  searchChange(event) {
    if (event) {
      const resultSearch  = this.vendor_list.filter( data => data.name.toLowerCase().includes(event.target.value));
      this.totalRecord    = resultSearch.length;
      this.loadingData(resultSearch);
    }
  }

  deleteTextSearch() {
    this.search = undefined;
    this.loadingData(this.vendor_list);
  }

  public excelExportExcel(component) {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;

    let altIdx = 0;
    rows.forEach((row) => {
        if (row.type === 'data') {
            if (altIdx % 2 !== 0) {
                row.cells.forEach((cell) => {
                    cell.background = '#aabbcc';
                });
            }
            altIdx++;
        }
    });

    component.save(options);
  }

  // end declear function

  // Declear function gride
  public setSelectableSettings() {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'multiple'
    };
  }

  loadingData(data) {
    if (data) {
      this.gridView = {
        data: orderBy(data.slice(this.skip, this.skip + this.pageSize), this.sort),
        total: data.length
      };
    }
    this.totalRecord = data.length;
  }

  loadData() {
    this.gridView = {
      data: orderBy(this.gridData.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.gridData.length
    };
  }

  pageChange({ skip, take }: PageChangeEvent) {
    this.skip = skip;
    this.pageSize = take;
    this.paging();
  }

  public rowCallback = (context: RowClassArgs) => {
      switch (context.dataItem.serviceStatusDesc) {
        case 'Deactivated':
          return {dormant: true};
          break;
        default:
          return {};
          break;
       }
  }

  private paging(): void {
    this.gridView = {
      data: this.gridData.slice(this.skip, this.skip + this.pageSize),
      total: this.gridData.length
    };
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadData();
  }
  // end gride function

}
