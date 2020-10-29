import { Component, OnInit } from '@angular/core';
import { FileRestrictions, SelectEvent, RemoveEvent, FileState } from '@progress/kendo-angular-upload';
import * as moment from 'moment';
import { UploadService } from '../../share/service/upload.service';
import { element } from 'protractor';

@Component({
  selector: 'app-home2000',
  templateUrl: './home2000.component.html',
  styleUrls: ['./home2000.component.css']
})
export class Home2000Component implements OnInit {

  sltLanguageList = false;
  on = true;
  public events: string[] = [];
    public imagePreviews: any[] = [];
    


    public fileRestrictions: FileRestrictions = {
      allowedExtensions: ['.jpg', '.png']
    };
    image = {
      src: '',
      uid: '',
      id: ''
    };

    file_name: string;
    file_extension: string; // '.jpg'
    file_type: string;
    file_source: string;
    file_size: number;
    modifiedDate: string;
    i = 0;

  constructor(
    private uploadService: UploadService
  ) { }

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
    console.log(e);
    const that = this;
    e.files.forEach((file) => {
    console.log(file.rawFile);
    let imagePreviews1 = [];
    console.log(`File selected: ${file}`);

    if (!file.validationErrors) {
        const reader = new FileReader();
        reader.onload = function (ev) {
       
        const image = {
            src: ev.target['result']+"",
            uid: file.uid,
            id: file.uid +"-"+moment().format('YYYYMMDDhhmmss')
        };
        imagePreviews1.push(image);
        that.imagePreviews.unshift(image);

        };
        this.i++;
        console.log(this.i);
        console.log(imagePreviews1);
        this.file_name = file.name;
        this.file_size =  file.size;
        this.file_type = file.rawFile.type;
        reader.readAsDataURL(file.rawFile);
        
    }
    
    });
    this.sltLanguageList = false;
    this.on = false;
    console.log(this.imagePreviews);
    if(this.imagePreviews) {
      alert(this.imagePreviews.length);
    }
    
}


public remove(fileSelect, uid: string) {
  fileSelect.removeFileByUid(uid);
  if(this.imagePreviews.length > 0) {
    this.imagePreviews.forEach((element,index) =>{
      if(element.uid === uid) {
          console.log("call add function", element, index);
          this.imagePreviews.splice(index, 1);
      }
    });
  }
}

public showButton(state: FileState): boolean {
  return (state === FileState.Selected) ? true : false;
}

upload(state) {
  console.log(this.imagePreviews);
  if(this.imagePreviews.length > 0) {
    this.imagePreviews.forEach(element =>{
      if(element.uid === state) {
          console.log("call add function", element);
          return 'a';
      } else {
        return false;
      }
    });
  }

  this.on = true;
  return 'data';

  
  console.log(state);
  
}


}
