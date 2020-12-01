import { Component, OnInit, Pipe } from '@angular/core';
import { ModalService } from '../../share/service/modal.service';
import { UserMngUserInfoAddFormComponent } from '../user-mng-user-info-add-form/user-mng-user-info-add-form.component';
import { UserMngUserInfoAddComponent } from '../user-mng-user-info-add/user-mng-user-info-add.component';
import { BTN_ROLES } from '../../share/constants/common.const';
import { DataService } from '../../share/service/data.service';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../../share/service/server.service';
import { GridDataResult, SelectableSettings, RowClassArgs } from '@progress/kendo-angular-grid';
import { UserDataModel } from '../../share/model/model/user-data';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/page-change-event';
import { TranslateService } from '@ngx-translate/core';
import { RequestDataModel } from '../../share/model/request/req-data';
import { UserInfoDetails } from '../../share/model/model/user-info-details';

@Component({
  selector: 'app-user-mng-user-info',
  templateUrl: './user-mng-user-info.component.html',
  styleUrls: ['./user-mng-user-info.component.css']
})
export class UserMngUserInfoComponent implements OnInit {
  totalRecord = 0;

  user_data_list = new Array<UserInfoDetails>();
  search: string;
  public data  = Array<UserInfoDetails>();
  // declear grid
  public gridData: any[];
  public gridView: GridDataResult;
  public selectableSettings: SelectableSettings;
  public skip = 0;
  public pageSize = 10;
  public buttonCount = 5;
  public info = true;
  public previousNext = false;
  public type: 'numeric' | 'input' = 'numeric';
  public pageSizes: any[] = [10, 20, 30, 50, 100];
  public sort: SortDescriptor[] = [{
    field: 'user_info_id',
    dir: 'asc'
  }];
  
  public checkboxOnly = false;
  public mySelection: any[] = [];
  // end declear grid
  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private titleService: Title,
    private service: ServerService,
    private translateService: TranslateService
  ) {
    this.setSelectableSettings();
   }

  ngOnInit(): void {
    this.titleService.setTitle(this.translateService.instant('UserMngUserInfo.Label.User_Information'));
    const url = (window.location.href).split('/');
    console.log(url);
    this.dataService.visitMessage(url[5]);
    this.inquiry();
  }

  add() {
    this.modalService.open({
      content: UserMngUserInfoAddComponent,
      callback: _response => {
        if(_response) {
          if(_response && _response.close === BTN_ROLES.SAVE) {
            this.modalService.showNotificationService(this.translateService.instant('UserMngUserInfo.Message.User_Info_Add_Success'), 400);
          }
        }
      }
    });
  }


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

  searchChange(event) {
    if (event) {
      console.log(event.target.value);
      const resultSearch  = this.user_data_list.filter( data => data.first_name.toLowerCase().includes(event.target.value));
      this.totalRecord    = resultSearch.length;
      this.loadingData(resultSearch);
    }
  }


  deleteTextSearch() {
    this.search = undefined;
    this.loadingData(this.user_data_list);
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

  
  Edit(dataItem) {

  }

  Delete() {

  }

  inquiry() {
    const trReq = new RequestDataModel();
    const api = '/api/user_info/v1/inquiry';
    this.service.HTTPGet(api).then(resp => {
      const response   = resp as any;
      if (response) {
        this.user_data_list = response.body;
        console.log('user_data_list', this.user_data_list);
        this.data          = response.body;
        this.loadingData(this.user_data_list);
      }
    });
  }
}
