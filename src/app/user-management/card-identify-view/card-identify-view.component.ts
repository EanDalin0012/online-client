import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../share/service/server.service';
import { CardIdentifyByIdRequest } from '../../share/model/request/card-identify-get-info';
import { CardIdentify } from '../../share/model/model/card-identify';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-card-identify-view',
  templateUrl: './card-identify-view.component.html',
  styleUrls: ['./card-identify-view.component.css']
})
export class CardIdentifyViewComponent implements OnInit {

  modal;
  card_identify_id: string;
  card_id: string;
  card_img_front: string;
  card_img_rear: string;
  cardIdentify = new CardIdentify();
  url = environment.bizServer.server +'/api/web/reader/read/';
  constructor(
    private serverService: ServerService,
  ) { }

  ngOnInit(): void {
    if(this.modal) {
      console.log(this.modal.message);
      this.card_identify_id = this.modal.message.card_identify_id;
      this.inquiry();
    }

  }

  close() {
    this.modal.close();
  }

  doRequest() {

  }

  inquiry() {

    let data = new CardIdentifyByIdRequest();
    data.body.card_id = this.card_identify_id;

    const api ='/api/card-identify/v1/id';

    this.serverService.HTTPPost(api, data).then(resp=> {
      console.log(resp);
      if(resp.body) {
        this.cardIdentify = resp.body;
        console.log('this.cardIdentify', this.cardIdentify);
      }
    });

  }

}
