import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GridDataResult, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { UserInfo } from '../../share/model/model/user-info';
import { DataService } from '../../share/service/data.service';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { UserDataRequest } from '../../share/model/request/req-user-data';
import { UserDataResponse } from '../../share/model/response/res-user-data';
import { BTN_ROLES } from '../../share/constants/common.const';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/page-change-event';
import { UserMngAccEditComponent } from '../user-mng-acc-edit/user-mng-acc-edit.component';

@Component({
  selector: 'app-user-mng-acc',
  templateUrl: './user-mng-acc.component.html',
  styleUrls: ['./user-mng-acc.component.css']
})
export class UserMngAccComponent implements OnInit {

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
  // end gride

  // declear varible

  public data: any[];
  totalRecord = 0;
  list: Array<UserInfo>;
  // end delear varible
  userInfoList = new Array<UserInfo>();
  constructor(
    private dataService: DataService,
    private titleService: Title,
    private service: ServerService,
    private modalService: ModalService
  ) {
    this.titleService.setTitle('User');
    this.setSelectableSettings();
   }

  ngOnInit(): void {
    const url = (window.location.href).split('/');
    this.dataService.visitMessage(url[5]);
    this.inquiry();
  }

  
  // Declear function

  inquiry() {
    const trReq = new UserDataRequest();
    const api = '/api/user/account/v1/list';
    this.service.HTTPGet(api).then(resp => {
      const response   = resp as UserDataResponse;
      if (response) {
        this.userInfoList =  response.body.items;
        this.gridData = this.userInfoList;
        this.list     = this.userInfoList;
        this.loadingData(this.userInfoList);
      }
    });
  }

  edit(dataItems) {
    let data = {
      account_id: dataItems.account_id
    }
    this.modalService.open({
      content: UserMngAccEditComponent,
      message: data,
      callback: _response => {
        if(_response) {
          if(_response && _response.close === BTN_ROLES.EDIT) {
            this.inquiry();
          }
        }
      }
    });
  }

  searchChange(event) {
    if (event) {
      console.log(event.target.value);
      const resultSearch  = this.list.filter( data => data.user_name.toLowerCase().includes(event.target.value));
      this.totalRecord    = resultSearch.length;
      this.loadingData(resultSearch);
    }
  }

  deleteTextSearch() {
    this.search = undefined;
    this.loadingData(this.list);
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
  // End Declear function

  // Declear function gride
  public setSelectableSettings() {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'multiple'
    };
  }

  loadingData(data) {
    this.gridView = {
      data: orderBy(data.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: data.length
    };
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
