import { Component, OnInit } from '@angular/core';
import { TextValue } from '../../share/model/model/text-value';
import { MonthList, GENDER_CODE_LIST, ButtonRole, ResponseStatus } from '../../share/constants/common.const';
import { GenderModel } from '../../share/model/model/gender';
import { FileRestrictions, FileState, SelectEvent } from '@progress/kendo-angular-upload';
import { UploadService } from '../../share/service/upload.service';
import { ModalService } from '../../share/service/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { FormatterService } from '../../share/service/formatter.service';
import { ServerService } from '../../share/service/server.service';
import * as moment from 'moment';
import { Base64WriteImage } from '../../share/model/model/base64';
import { UserInfoRequestModel } from '../../share/model/request/res-user-info';
import { StepperActivateEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-user-mng-user-info-edit',
  templateUrl: './user-mng-user-info-edit.component.html',
  styleUrls: ['./user-mng-user-info-edit.component.css']
})
export class UserMngUserInfoEditComponent implements OnInit {


  uploaded: boolean;
  card_fron_uploaded: boolean;
  card_rear_uploaded: boolean;

  public stepsIcons = [];

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
  month_list:  TextValue[] = MonthList;
  year_list: TextValue[];

  email: string;
  contact: string;
  card_id: string;
  resource_img_id: string;
  description: string;
  address: string;
  currentGroup= 'abcd';
  genderItems = GENDER_CODE_LIST;
  gender: GenderModel;

  userName:string;
  enabled: boolean            = false;
  accountLocked:boolean       = false;
  credentialsExpired: boolean = false;
  accountExpired: boolean     = false;
  is_first_login: boolean     = false;

  user_information_validate = false;
  user_information_error    = false;
  account_validate = false;
  profile_id_image: string;
  font_image_id: string;
  rear_image_id: string;
  user_name: string;
  pw: string;
  re_pw: string;

  default_gender = {
    text: 'Select Gender',
    value: ''
  };

  // file select declear
  public imagePreviews: any[] = [];
  public imagePreviews_card_front: any[] = [];
  public imagePreviews_card_rear: any[] = [];

  public fileRestrictions: FileRestrictions = {
      allowedExtensions: ['.jpg', '.png']
  };
  public fileRestrictions_card_front: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png']
};
public fileRestrictions_card_rear: FileRestrictions = {
  allowedExtensions: ['.jpg', '.png']
};
  i = 0;
// end file select declear

  constructor(
    private uploadService: UploadService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private formatterService: FormatterService,
    private serverService: ServerService
  ) {

  }
  ngOnInit(): void {
    this.day_list = [];
    this.year_list = [];
    this.is_first_login = true;
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

    this.day_list  = this.loadDayList(month,Number(currentMont) );
    this.year_list = this.loadYearList(contYear + 1, 80);

    this.stepsIcons = [
      { label: this.translateService.instant('UserMngUserInfo.Label.User_Information'),  isValid: true },
      { label: this.translateService.instant('UserMngUserInfo.Label.Profile'), isValid: true },
      { label: this.translateService.instant('UserMngUserInfo.Label.Kh_Id'), isValid: false },
      { label: this.translateService.instant('UserMngUserInfo.Label.Account'), isValid: false  }
    ];

  }

  public currentStep = 0;

  public next(value: number): void {
    console.log(value);
    if(value === 0) {
      if(this.checkUserInfo()) {
        this.stepsIcons[0].isValid =  true;
        this.stepsIcons[1].isValid =  true;
        this.currentStep += 1;
      } else {
        this.stepsIcons[0].isValid =  false;
      }
    } else if (value === 1) {
      this.currentStep += 1;
    }else if (value === 2) {
      if(this.checkCardIdentyfy()) {
        this.stepsIcons[2].isValid =  true;
        this.currentStep += 1;
      } else {
        this.stepsIcons[2].isValid =  false;
      }
    }else if (value === 3) {
      this.currentStep += 1;
    }
  }

  public prev(): void {
      this.currentStep -= 1;
  }

  public submit(): void {
  }

  close() {
    this.modal.close( {close: ButtonRole.close});
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
            src: ev.target['result'],
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
        this.uploaded = undefined;
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
      this.uploaded = undefined;
      this.profile_id_image = undefined;

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
            if(splitted[1]) {
              base64WriteImage.id         = element.id;
              base64WriteImage.base64     = splitted[1];
              base64WriteImage.file_name  = element.name;
              base64WriteImage.file_type  = element.type;
              base64WriteImage.file_size  = element.size;
              base64WriteImage.file_extension = element.extension;
              this.uploadService.upload(base64WriteImage).then(resp=>{
                if(resp === true) {
                  this.profile_id_image = base64WriteImage.id;
                  this.uploaded = true;
                  this.modalService.showNotificationService(this.translateService.instant('UserMngUserInfo.Message.Upload_Profile_Image_Success'), 400,'notification-profile');
                  console.log('profile_id_image', this.profile_id_image);
                }
              });
            }
        }
      });
    }

  }


  public selectEventHandler_card_front(e: SelectEvent): void {
    this.imagePreviews_card_front = [];
    const that = this;
    e.files.forEach((file) => {

    if (!file.validationErrors) {
        const reader = new FileReader();
        reader.onload = function (ev) {

        const image = {
            src: ev.target['result'],
            uid: file.uid,
            id: file.uid +"-"+moment().format('YYYYMMDDhhmmss'),
            name: file.name,
            size: file.size,
            type: file.rawFile.type,
            extension: file.extension
        };
        that.imagePreviews_card_front.unshift(image);

        };
        reader.readAsDataURL(file.rawFile);
    }
    });
    this.card_fron_uploaded = undefined;

  }
  public remove_card_front(fileSelect, uid: string) {
      fileSelect.removeFileByUid(uid);
      if(this.imagePreviews_card_front.length > 0) {
        this.imagePreviews_card_front.forEach((element,index) =>{
          if(element.uid === uid) {
              console.log("call add function", element, index);
              this.imagePreviews_card_front.splice(index, 1);
          }
        });
      }
      this.card_fron_uploaded = undefined;
      this.font_image_id = undefined;

    }



  upload_card_front(state) {
    console.log(this.imagePreviews_card_front);
    if(this.imagePreviews_card_front.length > 0) {
      this.imagePreviews_card_front.forEach(element =>{
        if(element.uid === state) {
            let splitted = element.src.split(',');
            const base64WriteImage = new Base64WriteImage();
            if(splitted[1]) {
              base64WriteImage.id         = element.id;
              base64WriteImage.base64     = splitted[1];
              base64WriteImage.file_name  = element.name;
              base64WriteImage.file_type  = element.type;
              base64WriteImage.file_size  = element.size;
              base64WriteImage.file_extension = element.extension;
              this.uploadService.upload(base64WriteImage).then(resp=>{
                if(resp === true) {
                  this.font_image_id = base64WriteImage.id;
                  this.card_fron_uploaded = true;
                  this.modalService.showNotificationService(this.translateService.instant('UserMngUserInfo.Message.Upload_Front_Image_Card_Success'), 400,'notification-profile');
                  console.log('font_image_id', this.font_image_id);

                }
              });

            }
        }
      });
    }

  }

  public selectEventHandler_card_rear(e: SelectEvent): void {
    this.imagePreviews_card_rear = [];
    const that = this;
    e.files.forEach((file) => {
    if (!file.validationErrors) {
        const reader = new FileReader();
        reader.onload = function (ev) {
        const image = {
            src: ev.target['result'],
            uid: file.uid,
            id: file.uid +"-"+moment().format('YYYYMMDDhhmmss'),
            name: file.name,
            size: file.size,
            type: file.rawFile.type,
            extension: file.extension
        };
        that.imagePreviews_card_rear.unshift(image);
        };
        reader.readAsDataURL(file.rawFile);
    }
    });
    this.card_rear_uploaded = undefined;
  }

  public remove_card_rear(fileSelect, uid: string) {
      fileSelect.removeFileByUid(uid);
      if(this.imagePreviews_card_rear.length > 0) {
        this.imagePreviews_card_rear.forEach((element,index) =>{
          if(element.uid === uid) {
              console.log("call add function", element, index);
              this.imagePreviews_card_rear.splice(index, 1);
          }
        });
      }
      this.card_rear_uploaded = undefined;
      this.rear_image_id = undefined;
  }

  upload_card_rear(state) {
    console.log(this.imagePreviews_card_rear);
    if(this.imagePreviews_card_rear.length > 0) {
      this.imagePreviews_card_rear.forEach(element =>{
        if(element.uid === state) {
            let splitted = element.src.split(',');
            const base64WriteImage = new Base64WriteImage();
            if(splitted[1]) {
              base64WriteImage.id         = element.id;
              base64WriteImage.base64     = splitted[1];
              base64WriteImage.file_name  = element.name;
              base64WriteImage.file_type  = element.type;
              base64WriteImage.file_size  = element.size;
              base64WriteImage.file_extension = element.extension;
              console.log(base64WriteImage);
              this.uploadService.upload(base64WriteImage).then(resp=>{
                if(resp === true) {
                  this.rear_image_id = base64WriteImage.id;
                  this.card_rear_uploaded = true;
                  this.modalService.showNotificationService(this.translateService.instant('UserMngUserInfo.Message.Upload_Rear_Image_Card_Success'), 400,'notification-profile');
                  console.log('rear_image_id', this.rear_image_id);
                }
              });

            }
        }
      });
    }

  }



  checkUserInfo():boolean {
    if(!this.first_name || this.first_name === '' || this.first_name === null) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_First_Name'));
    } else if (!this.last_name || this.last_name === '' || this.last_name === null) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Last_Name'));
    } else if (!this.gender || this.gender.value === '') {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Gender'));
    } else if(!this.day) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Day'));
    } else if(!this.month) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Month'));
    } else if(!this.year) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Year'));
    }else if(!this.email || this.email === '' || this.email == null) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Email'));
    }else if(!this.contact || this.contact === '' || this.contact == null) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Contact'));
    } else if (this.email || this.email !== '' || this.email !== null) {
        let bol = this.formatterService.validateEmail(this.email);
        if(!bol) {
          this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Invalid_Email'));
        }
        return bol;
    }else {
      this.user_information_validate = true;
      return true;
    }
  }

  checkCardIdentyfy(){
    if(!this.card_id || this.card_id === '' || this.card_id === null) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Card_Id'));
    } else {
      return true;
    }
  }

  checkAccount(){
    if(!this.user_name || this.user_name === '' || this.user_name === null) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_User_Name'));
    } else if(!this.pw || this.pw === '' || this.pw === null) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_PW'));
    } else if (!this.re_pw || this.re_pw === '' || this.re_pw === null) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Required_Re_PW'));
    } else if(this.pw !== this.re_pw) {
      return this.modalService.messageAlert(this.translateService.instant('UserMngUserInfo.Message.Password_Not_Macth'));
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

  loadDayList(month: number[], currentMont: number):TextValue[]{
    console.log(month);
    let vData: TextValue[] = [];
    month.forEach((element, index) => {
      if(index +1 === Number(currentMont)) {
        for(let i = 1; i<= element; i++) {
          vData.push({
            text: i,
            value: i
          });
        }
      }
    });
    return vData;
  }

    loadYearList(startYear: number, nYear: number):TextValue[] {
      let vData: TextValue[] = [];
      for(let j = 0; j<= nYear;j++) {
        const data = startYear -=1;
          vData.push({
          text: data,
          value: data
        });
    }
    return vData;
  }

  valueChangeMonth(event) {
    if(event)  {
      const monthList = this.getNumberDayOfMonth(Number(event.value), Number(this.year.value));
      this.day_list  = this.loadDayList(monthList,Number(event.value) );
      if(Number(this.day.value) > this.day_list.length) {
        this.day = undefined;
      }
    }

  }

  valueChangeYear(event) {
    if(event)  {
      const monthList = this.getNumberDayOfMonth(Number(this.month.value), Number(event.value));
      this.day_list  = this.loadDayList(monthList,Number(this.month.value) );
      if(Number(this.day.value) > this.day_list.length) {
        this.day = undefined;
      }
    }
  }

  doRequest() {
       if(!this.checkUserInfo()) {
         this.currentStep = 0;
         return;
       } else if(!this.checkCardIdentyfy()){
        this.currentStep = 2;
          return;
       } else if(!this.checkAccount()){
        this.currentStep = 3;
        return;
       }
      const userInfoRequestModel = new UserInfoRequestModel();

      let day = (this.day.value.toString().length === 1 ? "0"+this.day.value : this.day.value);
      let month = (this.month.value.toString().length === 1 ? "0"+this.month.value : this.month.value);

      const date_birth = this.year.value+""+month+""+day;

      userInfoRequestModel.body.personalInfo = {
                                                  first_name: this.first_name,
                                                  last_name: this.last_name,
                                                  gender: this.gender.value,
                                                  date_birth: date_birth,
                                                  email: this.email,
                                                  contact: this.contact,
                                                  description: this.description,
                                                  profile_id_image: this.profile_id_image
                                                }
      userInfoRequestModel.body.cardIdentify = {
                                                card_id: this.card_id,
                                                font_image_id: this.font_image_id,
                                                rear_image_id: this.rear_image_id
                                                }
      userInfoRequestModel.body.accountInfo = {
                                                user_name: this.user_name,
                                                pw: this.pw,
                                                is_first_login: this.is_first_login,
                                                enable: this.enabled,
                                                account_lock: this.accountLocked,
                                                credential_expired: this.credentialsExpired,
                                                account_expired: this.accountExpired,
                                              }
      console.log(userInfoRequestModel);
      const api = '/api/user_info/v1/save';
      this.serverService.HTTPPost(api, userInfoRequestModel).then(response=>{
        if(response && response.body.status === ResponseStatus.Y) {
          this.modal.close( {close: ButtonRole.save});
        }
      });

  }

  public onStepActivate(ev: StepperActivateEvent): void {
    if (ev.index === this.stepsIcons.length - 1) {
        ev.preventDefault();
        this.currentStep =  this.stepsIcons.length - 1;
        console.log('Please fill previous steps');
    }
    this.stepsIcons[0].isValid = this.checkUserInfoActivated();
    this.stepsIcons[2].isValid = this.checkCardIdentyfyActivated();
    console.log(`Step ${ev.index} was activated`);
    console.log(ev);
}

checkUserInfoActivated():boolean {
  if(!this.first_name || this.first_name === '' || this.first_name === null) {
    return false;
  } else if (!this.last_name || this.last_name === '' || this.last_name === null) {
    return false;
  } else if (!this.gender || this.gender.value === '') {
    return false;
  } else if(!this.day) {
    return false;
  } else if(!this.month) {
    return false;
  } else if(!this.year) {
    return false;
  }else if(!this.email || this.email === '' || this.email == null) {
    return false;
  }else if(!this.contact || this.contact === '' || this.contact == null) {
    return false;
  } else {
    return true;
  }
}

checkCardIdentyfyActivated(){
  if(!this.card_id || this.card_id === '' || this.card_id === null) {
    return false;
  } else {
    true;
  }
}

}
