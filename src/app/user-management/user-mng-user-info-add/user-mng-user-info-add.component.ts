import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { FileRestrictions, FileState, SelectEvent } from '@progress/kendo-angular-upload';
import { Base64WriteImage } from '../../share/model/model/base64';
import * as moment from 'moment';
import { UploadService } from '../../share/service/upload.service';
import { BTN_ROLES, GENDER_CODE_LIST, Month_List } from '../../share/constants/common.const';
import { ModalService } from '../../share/service/modal.service';
import { GenderModel } from '../../share/model/model/gender';
import { TranslateService } from '@ngx-translate/core';
import { TextValue } from '../../share/model/model/text-value';
@Component({
  selector: 'app-user-mng-user-info-add',
  templateUrl: './user-mng-user-info-add.component.html',
  styleUrls: ['./user-mng-user-info-add.component.css']
})
export class UserMngUserInfoAddComponent implements OnInit {
  modal;
  
  first_name: string;
  last_name: string;
  date_birth: Date = new Date();

  day: TextValue;
  day_defaul: TextValue = {
    text: "Select Day",
    value: ''
  };

  month: TextValue;
  month_defaul: TextValue ={
    text: "Select Month",
    value: ''
  };

  year: TextValue;
  year_defaul: TextValue ={
    text: "Select Year",
    value: ''
  };

  day_list: TextValue[];
  month_list:  TextValue[] = Month_List;
  year_list: TextValue[];

  email: string;
  contact: string;
  kh_id: string;
  resource_img_id: string;
  description: string;
  address: string;
  currentGroup= 'abcd';
  genderItems = GENDER_CODE_LIST;
  gender: GenderModel;

  userName:string;
  enabled: boolean;
  accountLocked:boolean;
  credentialsExpired: boolean;
  accountExpired: boolean;
  is_first_login: boolean;
  
  user_information_validate = false;
  account_validate = false;

  defaultCountry = {  
    text: 'Select Gender',
    value: ''
  };

  // file select declear
  public imagePreviews: any[] = [];
  public fileRestrictions: FileRestrictions = {
      allowedExtensions: ['.jpg', '.png']
  };
  i = 0;
// end file select declear

  constructor(
    private uploadService: UploadService,
    private modalService: ModalService,
    private translateService: TranslateService
  ) {

  }
  ngOnInit(): void {
    this.day_list = [];
    this.year_list = [];
    const contYear = Number(moment().format("YYYY")) -5;

    let month = this.getNumberDayOfMonth(2,contYear);
    this.year = {
      text: contYear,
      value: contYear
    };
    const currentMont =  moment().format("MM");
   
    this.month = {
      text: moment().format("MMM"),
      value: moment().format("MM")
    }
    const currentDay =  moment().format("DD");

    let day = [];
    month.forEach((element, index) => {
      if(index +1 === Number(currentMont)) {
        console.log(index +1, currentMont, element);
        for(let i = 1; i<= element; i++) {
          this.day_list.push({
            text: i,
            value: i
          });
        }
      }
    });
    let v = contYear + 1;
    for(let j = 0; j<= 80;j++) {
      const vData = v -=1;
      this.year_list.push({
        text: vData,
        value: vData
      });
    }
    console.log('is leap year', month, currentMont, this.day_list, (Number(contYear)-10), this.year_list);
  }

  public currentStep = 0;

  @ViewChild('stepper', { static: true })
  public stepper: StepperComponent;

  private isStepValid = (index: number): boolean => {
      return true;
  }

  private shouldValidate = (index: number): boolean => {
      return true;
  }

  public steps = [
      {
          label: 'User Information',
          isValid: this.isStepValid,
          icon:"user",
          selected: true,
          validate: this.user_information_validate,
          error: true,
      },
      {
        label: 'Profile',
        isValid: true,
        icon:"user",
        selected: false,
        validate: false,
        error: true,
    },
    {
        label: 'Account',
        isValid: true,
        icon:"k-icon k-i-file-word",
        selected: false,
        validate: false,
        error: true,
    }
  ];

  public next(): void {
     if(this.checkUserInfo()) {
      this.currentStep += 1;
     }
     

      // if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
      //     this.currentStep += 1;
      //     return;
      // }

      // this.currentGroup.markAllAsTouched();
      // this.stepper.validateSteps();
  }

  public prev(): void {
      this.currentStep -= 1;
  }

  public submit(): void {
      // if (!this.currentGroup.valid) {
      //     this.currentGroup.markAllAsTouched();
      //     this.stepper.validateSteps();
      // }
      // if (this.form.valid) {
      //     console.log('Submitted data', this.form.value);
      // }
  }

  private getGroupAt(index: number) {
      // const groups = Object.keys(this.form.controls).map(groupName =>
      //     this.form.get(groupName)
      //     ) as FormGroup[];

      // return groups[index];
  }

  close() {
    this.modal.close( {close: BTN_ROLES.CLOSE});
  }

 Delete(value: string) {
    switch(value) {
        case 'first_name':
            this.first_name = undefined;
            break;
        case 'last_name':
            this.last_name = undefined;
            break;
        case 'email':
            this.email = undefined;
            break;
        case 'contact':
            this.contact = undefined;
            break;
        
    }
 }

 // file select function
 public selectEventHandler(e: SelectEvent): void {
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
                this.resource_img_id = base64WriteImage.id;
                console.log('resource_img_id', this.resource_img_id);
                
              }
            });

          }
          
         
      } else {
      }
    });
  }
  
}

checkUserInfo():boolean {
  console.log(this.gender.value, this.date_birth.getDate(), this.date_birth.getMonth(), this.date_birth.getFullYear());
  
  if(!this.first_name || this.first_name === '' || this.first_name === null) {
    console.log(this.first_name);
    return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_First_Name'));
  } else if (!this.last_name || this.last_name === '' || this.last_name === null) {
    return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Last_Name'));
  } else if (!this.gender.value) {
    return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Gender'));
  } else if(!this.date_birth) {

  }
   else {
    return true;
  }
}


  getNumberDayOfMonth(month: number, year: number) {
    // note that month is 0 base like in the date date obje
    let isLeap = ((year % 4) === 0 && ((year % 100) != 0 || (year % 400) ==0 ));
    return [ 31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31,
      31, 30, 31, 30, 31 ];
  }

  // end file select function

}
