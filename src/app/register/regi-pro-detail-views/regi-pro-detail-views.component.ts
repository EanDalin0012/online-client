import { Component, OnInit } from '@angular/core';
import { BTN_ROLES } from '../../share/constants/common.const';
import { ProductDescriptionIDRequest } from '../../share/model/request/req-product-description-by-by';
import { ServerService } from '../../share/service/server.service';
import { ProductViewDetails } from '../../share/model/model/product-view-detias';

@Component({
  selector: 'app-regi-pro-detail-views',
  templateUrl: './regi-pro-detail-views.component.html',
  styleUrls: ['./regi-pro-detail-views.component.css']
})
export class RegiProDetailViewsComponent implements OnInit {

  public items: any[] = [
    { title: 'Flower', url: 'https://bit.ly/2cJjYuB' },
    { title: 'Mountain', url: 'https://bit.ly/2cTBNaL' },
    { title: 'Sky', url: 'https://bit.ly/2cJl3Cx' }
];
public width = '100%';
public height = '400px';
public arrows = true;

  modal;
  productViewDetails = new ProductViewDetails();
  public modelEn = {
    editorData: ''
  };

  public modelKH = {
    editorData: ''
  };

  public modelCH = {
    editorData: ''
  };
  
  constructor(
    private service: ServerService
  ) { }

  ngOnInit(): void {
    if(this.modal.message) {
      console.log(this.modal.message.product_detials_id);
      this.inquiry(this.modal.message.product_detials_id);
    }
  }

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  onTabSelect(e) {
    console.log(e);
  }

  inquiry(id: string) {
    const trReq = new ProductDescriptionIDRequest();
    trReq.body.product_detials_id = id;
    const api = '/api/product/description/v1/retrieve_id';
    this.service.HTTPPost(api, trReq).then(resp => {
      const response   = resp as any;
      console.log(response);
      if (response) {
        this.productViewDetails = response.body;
        this.modelEn.editorData = this.productViewDetails.context_en;
        this.modelKH.editorData = this.productViewDetails.context_kh;
        this.modelCH.editorData = this.productViewDetails.context_ch;
        console.log('this.productViewDetails',this.productViewDetails);
      }
    });
  }

}
