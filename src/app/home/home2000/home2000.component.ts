import { Component, OnInit } from '@angular/core';
import { FileRestrictions, SelectEvent, RemoveEvent } from '@progress/kendo-angular-upload';
import * as moment from 'moment';

@Component({
  selector: 'app-home2000',
  templateUrl: './home2000.component.html',
  styleUrls: ['./home2000.component.css']
})
export class Home2000Component implements OnInit {

  public events: string[] = [];
    public imagePreviews: any[] = [];

    public fileRestrictions: FileRestrictions = {
      allowedExtensions: ['.jpg', '.png']
    };
  
    file_name: string;
    file_extension: string; // '.jpg'
    file_type: string;
    file_source: string;
    file_size: number;
    modifiedDate: string;

  constructor() { }

  ngOnInit(): void {
  }

  public removeEventHandler(e: RemoveEvent): void {
    const index = this.imagePreviews.findIndex(item =>item.uid === e.files[0].uid);
    console.log(index);
    
    if (index >= 0) {
    //this.imagePreviews.splice(index, 1);
    console.log(this.imagePreviews.splice(index, 1));
    }
}

public selectEventHandler(e: SelectEvent): void {
    const that = this;

    e.files.forEach((file) => {
      console.log(e.files);
      
    that.log(`File selected: ${file.name}`);

    if (!file.validationErrors) {
        const reader = new FileReader();

        reader.onload = function (ev) {
          
        const image = {
            src: ev.target['result'],
            uid: file.uid,
            id: file.uid +"-"+moment().format('YYYYMMDDhhmmss')
        };

        that.imagePreviews.unshift(image);
        };
       
        reader.readAsDataURL(file.rawFile);
        this.file_name = file.name;
        this.file_size =  file.size;
        this.file_type = file.rawFile.type;
    }
    
    });
    
}

private log(event: string): void {
    this.events.unshift(`${event}`);
}

}
