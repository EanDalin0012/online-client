import { Component, OnInit } from '@angular/core';
import { RequestDataModel } from '../../share/model/request/req-data';
import { ServerService } from '../../share/service/server.service';
import { CategoryReponseModel } from '../../share/model/response/res-category';
import { CategoryModel } from '../../share/model/model/category';
import { GridDataResult, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/page-change-event';
import { ModalService } from '../../share/service/modal.service';
import { RegiCateAddComponent } from '../regi-cate-add/regi-cate-add.component';
import { BTN_ROLES, Reponse_Status } from '../../share/constants/common.const';
import { DataService } from '../../share/service/data.service';
import { RegiCateEditComponent } from '../regi-cate-edit/regi-cate-edit.component';
import { Title } from '@angular/platform-browser';
import { ObjIdDeleteRequest } from '../../share/model/request/req-obj-delete';
import { ResponseDataModel } from '../../share/model/response/res-data';

@Component({
  selector: 'app-regi-cate',
  templateUrl: './regi-cate.component.html',
  styleUrls: ['./regi-cate.component.css']
})
export class RegiCateComponent implements OnInit {
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

  // tslint:disable-next-line:member-ordering
  totalRecord = 0;
  // tslint:disable-next-line:member-ordering
  categorylist = new Array<CategoryModel>();
  // tslint:disable-next-line:member-ordering
  obj_Id_model_list = [];
  public data  = Array<CategoryModel>();
  menu = '';

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

  inquiry(){
    const trReq = new RequestDataModel();
    const api = '/api/category/v1/list';
    this.service.HTTPGet(api).then(resp => {
      const response   = resp as CategoryReponseModel;
      if (response) {

        this.categorylist = response.body;
        this.data          = response.body;
        this.gridData      = this.categorylist;
        this.loadingData(this.categorylist);
      }
    });
  }

  // Declear function gride
  setSelectableSettings() {
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
        default:
          return {};
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

  // declear function
  searchChange(event) {
    if (event) {
      console.log(event.target.value);
      const resultSearch  = this.categorylist.filter( data => data.name.toLowerCase().includes(event.target.value));
      this.totalRecord    = resultSearch.length;
      this.loadingData(resultSearch);
    }
  }

  deleteTextSearch() {
    this.search = undefined;
    this.loadingData(this.categorylist);
  }

  public excelExportExcel(component) {
    const options = component.workbookOptions();
    const rows = options.sheets[0].rows;
    console.log(rows);

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

  edit(dataItems) {
    this.modalService.open({
      content: RegiCateEditComponent,
      message: dataItems,
      callback: response => {
        if (response) {
          if ( response && response.close === BTN_ROLES.EDIT) {
            this.inquiry();
          }
        }
      }
    });
  }

  add() {
    this.modalService.open({
      content: RegiCateAddComponent,
      callback: response => {
        if (response) {
          if (response && response.close === BTN_ROLES.SAVE) {
            this.inquiry();
          }
        }
      }
    });
  }

  delete() {
    if (this.mySelection.length > 0) {
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
            id: element + ''
          });

          ++i;
      });

      this.modalService.confirm({
        title: 'Delete Item(s)',
        content: 'Your select item(s) is: ' + name,
        lBtn: {btnText: 'Close'},
        rBtn: {btnText: 'Confirm'},
        modalClass: ['pop-confirm-btn dialog-confirm'],
        callback: response =>{
          console.log('response', response);
          if (response.text === 'Confirm') {
            this.doDelete();
          }
        }
      });
    } else {
      this.modalService.alert({
        title: 'Delete Item(s)',
        content: '<h2>Please select Item(s) that you want to delete.</h2>',
        btnText: 'Confirm',
        callback: response => {}
      });
    }
  }

  getNameById(val: number): string {
    let name = '';
    this.categorylist.forEach(element => {
      if (element.id === val) {
        name = element.name ; // + '(' + element.id + ')';
      }
    });
    return name;
  }

  doDelete() {
    const trReq = new ObjIdDeleteRequest();
    trReq.body = this.obj_Id_model_list;
    console.log(trReq);
    const api = '/api/category/v1/delete';
    this.service.HTTPPost(api, trReq).then(resp => {
      const response   = resp as ResponseDataModel;
      if (response.body.status === Reponse_Status.Y) {
       this.inquiry();
      }
    });
  }

  menue() {
    this.menu = data;
  }

}

const data = '<div class="m"><table class=" table02 tmenue "><tbody><tr>'
+ '<th scope=" row "></th></tr><tr>'
+ '<th scope="row "></th></tr></tbody>'
+ ' </table>  </div>';
