import { Component, OnInit } from '@angular/core';
import { StepperActivateEvent } from '@progress/kendo-angular-layout';
import { TranslateService } from '@ngx-translate/core';
import { FileRestrictions, FileState, SelectEvent } from '@progress/kendo-angular-upload';
import * as moment from 'moment';
import { Base64WriteImage } from '../../share/model/model/base64';
import { UploadService } from '../../share/service/upload.service';
import { ModalService } from '../../share/service/modal.service';
import { ServerService } from '../../share/service/server.service';
import { BTN_ROLES } from '../../share/constants/common.const';

@Component({
  selector: 'app-regi-pro-detail-add',
  templateUrl: './regi-pro-detail-add.component.html',
  styleUrls: ['./regi-pro-detail-add.component.css']
})
export class RegiProDetailAddComponent implements OnInit {
  modal;

  config: {
    customConfig: ''
  }
  
  public model = {
    editorData: '<p>Hello, world! Hello </p>'
  };

  public stepsIcons = [];
  public currentStep = 0;
  image_uploaded: boolean;

  // file select declear
  public imagePreviews: any[] = [];
  resource_img_id_list: any[] = [];
  public fileRestrictions: FileRestrictions = {
      allowedExtensions: ['.jpg', '.png']
  };
// end file select declear

  constructor(
    private translateService: TranslateService,
    private serverService: ServerService,
    private modalService: ModalService,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.stepsIcons = [ 
      { label: this.translateService.instant('RegiProDetail.Label.Product_Details_image'),  isValid: true },
      { label: this.translateService.instant('RegiProDetail.Label.Product_Details_Description'), isValid: true }
    ];
    this.image_uploaded = false;
    this.resource_img_id_list = [];
  }

  public onStepActivate(ev: StepperActivateEvent): void {
    if (ev.index === this.stepsIcons.length - 1) {
        ev.preventDefault();
        this.currentStep =  this.stepsIcons.length - 1;
        console.log('Please fill previous steps');
    }
    console.log(`Step ${ev.index} was activated`);
    console.log(ev);
  }

  // file select function
  public selectEventHandler(e: SelectEvent): void {
    this.image_uploaded = false;
    this.imagePreviews = [];
    const that = this;
    e.files.forEach((file) => {
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
        reader.readAsDataURL(file.rawFile);
        
    }
    
    });
  }
  public remove(fileSelect, uid: string) {
      this.image_uploaded = false;
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
            this.uploadService.upload(base64WriteImage).then(resp=>{
              if(resp === true) {
                this.resource_img_id_list.push({resource_id: base64WriteImage.id});
                this.image_uploaded = true;
                console.log('resource_img_id', this.resource_img_id_list);
                
              }
            });

          }
          
         
      } else {
      }
    });
  }
  
}
  // end file select function
  public prev(): void {
    this.currentStep -= 1;
  }

  public next(value: number): void {
    console.log(value);
    this.currentStep += 1;
    if(value === 0) {
      // if(this.checkUserInfo()) {
      //   this.stepsIcons[0].isValid =  true;
      //   this.stepsIcons[1].isValid =  true;
      //   this.currentStep += 1;
      // } else {
      //   this.stepsIcons[0].isValid =  false;
      // }
    } else if (value === 1) {
      this.currentStep += 1;
    }
  }


  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

  save() {
    console.log(this.model);
  }
}
