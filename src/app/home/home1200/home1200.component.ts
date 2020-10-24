import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../share/service/upload.service';
import { ServerService } from '../../share/service/server.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-home1200',
  templateUrl: './home1200.component.html',
  styleUrls: ['./home1200.component.css']
})
export class Home1200Component implements OnInit {

  data: string;

  constructor(
    private uploadService: UploadService,
    private serverService: ServerService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  
  getData():string {
     this.uploadService.getFile('123-abc').then(res =>{
      if(res) {
        this.data = res as any;
        console.log(this.data);
        return this.data;
      }
    });
    return "";
  }

}
