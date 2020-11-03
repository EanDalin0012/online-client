import { Component, OnInit } from '@angular/core';
import { FileRestrictions, SelectEvent, RemoveEvent, FileState } from '@progress/kendo-angular-upload';
import * as moment from 'moment';
import { UploadService } from '../../share/service/upload.service';
import { Base64WriteImage } from '../../share/model/model/base64';

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
  
    // file_name: string;
    // file_extension: string; // '.jpg'
    // file_type: string;
    // file_source: string;
    // file_size: number;
    // modifiedDate: string;
    i = 0;

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
  }

  public removeEventHandler(e: RemoveEvent): void {
    const index = this.imagePreviews.findIndex(item =>item.uid === e.files[0].uid);
    if (index >= 0) {
    console.log(this.imagePreviews.splice(index, 1));
    }
}

public selectEventHandler(e: SelectEvent): void {
    this.imagePreviews = [];
    const that = this;
    e.files.forEach((file) => {
    console.log('testing', file);
    let imagePreviews1 = [];

    if (!file.validationErrors) {
        const reader = new FileReader();
        reader.onload = function (ev) {
       
        const image = {
            src: ev.target['result']+"",
            uid: file.uid,
            id: file.uid +"-"+moment().format('YYYYMMDDhhmmss'),
            name: file.name,
            size: file.size,
            type: file.rawFile.type,
            extension: file.extension
        };
        imagePreviews1.push(image);
        that.imagePreviews.unshift(image);

        };
        this.i++;
        console.log(this.i);
        console.log(imagePreviews1);
        reader.readAsDataURL(file.rawFile);
        
    }
    
    });
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
          let splitted = element.src.split(','); 
          const base64WriteImage = new Base64WriteImage();          
          console.log('splitted', splitted)
          if(splitted[1]) { 
            base64WriteImage.id         = element.id;
            base64WriteImage.base64     = splitted[1];
            base64WriteImage.file_name  = element.name;
            base64WriteImage.file_type  = element.type;
            base64WriteImage.file_size  = element.size;
            base64WriteImage.file_extension = element.extension;
            console.log('abc', base64WriteImage);
  
            this.uploadService.upload(base64WriteImage).then(resp=>{
  
            });

          }
          
         
      } else {
      }
    });
  }
  
}


}
