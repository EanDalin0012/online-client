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
import { BTN_ROLES } from '../../share/constants/common.const';
import { RegiVenEditComponent } from '../regi-ven-edit/regi-ven-edit.component';

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

  constructor(
    private service: ServerService,
    private modalService: ModalService,
    private dataService: DataService,
    private titleService: Title
  ) { 
    this.titleService.setTitle('Category');
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
    const api = '/api/vendor/list';
    this.service.HTTPget(api).then(resp => {
      const response   = resp as VendorResponseModel;
      if (response) {
        this.vendor_list = response.body;
        this.data          = response.body;
        this.loadingData(this.vendor_list);
      }
    });
  }

  delete() {

  }

  add() {
    this.modalService.open({
      content: RegiVenAddComponent,
      callback: response =>{
        if(response.close === BTN_ROLES.SAVE) {
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
          this.inquiry();
        }
      }
    });
  }


  searchChange(event) {
    if (event) {
      console.log(event.target.value);
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
