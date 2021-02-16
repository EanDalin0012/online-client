import { Component, OnInit } from '@angular/core';
import { SetProductPriceModel } from '../../share/model/model/set-product-price';
import { ProductModel } from '../../share/model/model/product';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { GridDataResult, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/page-change-event';
import { UserDataRequest } from '../../share/model/request/req-user-data';
import { DataService } from '../../share/service/data.service';
import { Title } from '@angular/platform-browser';
import { ServerService } from '../../share/service/server.service';
import { ModalService } from '../../share/service/modal.service';
import { SetPriceProductAddComponent } from '../set-price-product-add/set-price-product-add.component';
import { SetPriceProductEditComponent } from '../set-price-product-edit/set-price-product-edit.component';
import { ButtonRole } from '../../share/constants/common.const';

@Component({
  selector: 'app-set-price-product',
  templateUrl: './set-price-product.component.html',
  styleUrls: ['./set-price-product.component.css']
})
export class SetPriceProductComponent implements OnInit {
   demoData: SetProductPriceModel[] = [{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 1,
    name: 'Product A',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 2,
    name: 'Product B',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 3,
    name: 'Product C',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 1,
    name: 'Product A',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 2,
    name: 'Product B',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 3,
    name: 'Product C',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 1,
    name: 'Product A',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 2,
    name: 'Product B',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 3,
    name: 'Product C',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 1,
    name: 'Product A',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 2,
    name: 'Product B',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 3,
    name: 'Product C',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 1,
    name: 'Product A',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 2,
    name: 'Product B',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  },{
    create_by: 1,
    create_date: '20201010',
    modify_by: 1,
    modify_date: '20201010',
    status: '1',
    id: 3,
    name: 'Product C',
    price: 10,
    currency: 'USD',
    sale_price: 10,
    sale_price_after_discount: 9,
    discount: 10,
  }];

  setProductPriceModelList = new Array<SetProductPriceModel>();
  list = new Array<SetProductPriceModel>();
  data = new Array<SetProductPriceModel>();

  totalRecord = 0;
// start gride
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

  constructor(
    private dataService: DataService,
    private titleService: Title,
    private service: ServerService,
    private modalService: ModalService
  ) {
    this.titleService.setTitle('Set Price Product');
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
    const api = '/api/set-pirce-product/list';
    this.service.HTTPGet(api).then(resp => {
      const response   = resp as any;
      if (response) {
        // this.setProductPriceModelList =  response.body.items;
        // TODO
        this.setProductPriceModelList = this.demoData;
        // End TODO
        this.gridData = this.setProductPriceModelList;
        this.list     = this.setProductPriceModelList;
        this.loadingData(this.setProductPriceModelList);
      }
    });
  }

  edit(dataItems) {
    this.modalService.open({
      content: SetPriceProductEditComponent,
      message: dataItems,
      callback: _response => {
        if(_response) {
          if(_response && _response.close === ButtonRole.edit) {
            this.inquiry();
          }
        }
      }
    });
  }

  searchChange(event) {
    if (event) {
      console.log(event.target.value);
      const resultSearch  = this.list.filter( data => data.name.toLowerCase().includes(event.target.value));
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

  // declear function

  // end declear function

}
