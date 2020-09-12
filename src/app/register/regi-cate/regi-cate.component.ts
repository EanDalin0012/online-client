import { Component, OnInit } from '@angular/core';
import { RequestDataModel } from '../../share/model/request/req-data';
import { ServerService } from '../../share/service/server.service';
import { CategoryReponseModel } from '../../share/model/response/res-category';
import { CategoryModel } from '../../share/model/model/category';
import { GridDataResult, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/page-change-event';

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

// start declear variable
totalRecord = 0;
categoryList = new Array<CategoryModel>();
  
  constructor(
    private service: ServerService
  ) { }

  ngOnInit(): void {
    this.inquiry();
  }

  inquiry() {
    const trReq = new RequestDataModel();
    const api = '/api/category/list';
    this.service.HTTPget(api).then(resp => {
      const response   = resp as CategoryReponseModel;
      if (response) {
        this.categoryList = response.body;
      }
    });
  }

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
