import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PageChangeEvent } from '@progress/kendo-angular-dropdowns/dist/es2015/common/page-change-event';
import { GridDataResult, RowClassArgs, SelectableSettings } from '@progress/kendo-angular-grid';
import { orderBy, SortDescriptor } from '@progress/kendo-data-query';
import { environment } from '../../../environments/environment.prod';
import { BTN_ROLES, Reponse_Status } from '../../share/constants/common.const';
import { ObjIdModel } from '../../share/model/model/obj-id';
import { ProductDetailsModel } from '../../share/model/model/product-details';
import { RequestDataModel } from '../../share/model/request/req-data';
import { ObjIdDeleteRequest } from '../../share/model/request/req-obj-delete';
import { SwitchRequest } from '../../share/model/request/req-switchs';
import { ResponseDataModel } from '../../share/model/response/res-data';
import { ProductDetaitsModelResponse } from '../../share/model/response/res-product';
import { DataService } from '../../share/service/data.service';
import { ModalService } from '../../share/service/modal.service';
import { ServerService } from '../../share/service/server.service';
import { RegiProAddComponent } from '../regi-pro-add/regi-pro-add.component';
import { RegiProDetailAddComponent } from '../regi-pro-detail-add/regi-pro-detail-add.component';
import { RegiProDetailViewsComponent } from '../regi-pro-detail-views/regi-pro-detail-views.component';
import { RegiProEditComponent } from '../regi-pro-edit/regi-pro-edit.component';
import { src } from './img';

@Component({
  selector: 'app-regi-pro',
  templateUrl: './regi-pro.component.html',
  styleUrls: ['./regi-pro.component.css']
})
export class RegiProComponent implements OnInit {
btnText: string;

src = "";
url: string;
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
totalRecord: number;
// end declear grid


// declear variable
product_list = new Array<ProductDetailsModel>();
data = new Array<ProductDetailsModel>();
obj_Id_model_list = new Array<ObjIdModel>();

// end declear varibale

  constructor(
    private service: ServerService,
    private modalService: ModalService,
    private dataService: DataService,
    private titleService: Title,
    private translateService: TranslateService,
    private router: Router
  ) { 
    this.titleService.setTitle('Product');
    this.setSelectableSettings();
  }

  ngOnInit(): void {
    this.url = environment.bizServer.server +'/api/web/reader/v1/read/';
    this.src = src;
    const url = (window.location.href).split('/');
    this.dataService.visitMessage(url[5]);
    this.btnText = this.translateService.instant('COMMON.BUTTON.ADD_NEW');
    this.inquiry();
  }


   // declear function
   inquiry() {
    const trReq = new RequestDataModel();
    const api = '/api/product/v1/list';
    this.service.HTTPGet(api).then(resp => {
      const response   = resp as ProductDetaitsModelResponse;
      if (response) {
        this.product_list = response.body;
        this.data          = response.body;
        this.loadingData(this.product_list);
      }
    });
  }

  edit(dataItems) {
    this.modalService.open({
      content: RegiProEditComponent,
      message: dataItems,
      callback: response =>{
        if(response.close === BTN_ROLES.EDIT) {
          this.modalService.showNotificationService(this.translateService.instant('RegiPro.Message.Pro_Update_Success'));
          this.inquiry();
        }
      }
    });
  }

  deleteTextSearch() {
    this.search = undefined;
    this.loadingData(this.product_list);
  }

  searchChange(event) {
    if (event) {
      const resultSearch  = this.product_list.filter( data => data.name.toLowerCase().includes(event.target.value));
      this.totalRecord    = resultSearch.length;
      this.loadingData(resultSearch);
    }
  }

  add() {
      this.modalService.open({
        content: RegiProAddComponent,
        callback: response =>{
          if(response.close === BTN_ROLES.SAVE) {
            this.modalService.showNotificationService(this.translateService.instant('RegiPro.Message.Pro_Save_Success'));
            this.inquiry();
          }
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
        modalClass: ['open-alert'],
        callback: response =>{
          
        }
      });
    }
  }

  getNameById(val: number): string {
    let name = '';
    this.product_list.forEach(element => {
      if (element.id === val) {
        name = element.name ; // + '(' + element.id + ')';
      }
    });
    return name;
  }

  doDelete() {
    const trReq = new ObjIdDeleteRequest();
    trReq.body = this.obj_Id_model_list;

    const api = '/api/product/v1/delete';
    this.service.HTTPPost(api, trReq).then(resp => {
      const response   = resp as ResponseDataModel;
      if (response.body.status === Reponse_Status.Y) {
        this.modalService.showNotificationService(this.translateService.instant('RegiPro.Message.Pro_Update_Success'));
        this.inquiry();
      }
    });
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
  // end gride function


  switchWeb(b: boolean, dataItem) {
    if(b !== undefined && dataItem) {
      const switchsRequest = new SwitchRequest();
      switchsRequest.body.value = b;
      switchsRequest.body.product_id = dataItem.id;
      const api = '/api/product/v1/switch_web';
      this.service.HTTPPost(api, switchsRequest).then( res=>{
        if ( res && res.body.status === Reponse_Status.Y) {
          this.modalService.showNotificationService(this.translateService.instant('RegiPro.Message.Pro_Show_On_Web_Success'));
          this.inquiry();
        }
      });
    }
    
  }

  switchMobile(b: boolean, dataItem) {
    if(b !== undefined && dataItem) {
      const switchsRequest = new SwitchRequest();
      switchsRequest.body.value = b;
      switchsRequest.body.product_id = dataItem.id;
      const api = '/api/product/v1/switch_mobile';
      this.service.HTTPPost(api, switchsRequest).then( res=>{
        if ( res && res.body.status === Reponse_Status.Y) {
          this.modalService.showNotificationService(this.translateService.instant('RegiPro.Message.Pro_Show_On_Mobile_Success'));
          this.inquiry();
        }
      });
    }
  }

  viewProductDeatil(dataItem) {
    this.modalService.open({
      content: RegiProDetailViewsComponent,
      message: dataItem,
      callback: response =>{
        if(response.close === BTN_ROLES.SAVE) {
          this.modalService.showNotificationService(this.translateService.instant('RegiPro.Message.Pro_Save_Success'));
          this.inquiry();
        }
      }
    });
  }

  addProductDeatil(dataItem) {
    this.modalService.open({
      message: dataItem,
      content: RegiProDetailAddComponent,
      callback: response =>{
        if(response.close === BTN_ROLES.SAVE) {
          this.modalService.showNotificationService(this.translateService.instant('RegiPro.Message.Pro_Save_Success'));
          this.inquiry();
        }
      }
    });
  }

}
