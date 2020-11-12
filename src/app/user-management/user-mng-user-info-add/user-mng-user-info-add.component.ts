import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { FileRestrictions, FileState, SelectEvent } from '@progress/kendo-angular-upload';
import { Base64WriteImage } from '../../share/model/model/base64';
import * as moment from 'moment';
import { UploadService } from '../../share/service/upload.service';
import { BTN_ROLES } from '../../share/constants/common.const';
import { ModalService } from '../../share/service/modal.service';
@Component({
  selector: 'app-user-mng-user-info-add',
  templateUrl: './user-mng-user-info-add.component.html',
  styleUrls: ['./user-mng-user-info-add.component.css']
})
export class UserMngUserInfoAddComponent implements OnInit {
  modal;
  
  first_name: string;
  last_name: string;
  gender: string;
  date_birth: string;
  email: string;
  contact: string;
  kh_id: string;
  resource_img_id: string;
  description: string;
  address: string;
  currentGroup= 'abcd';

  userName:string;
  enabled: boolean;
  accountLocked:boolean;
  credentialsExpired: boolean;
  accountExpired: boolean;
  is_first_login: boolean;
  
  user_information_validate = false;
  account_validate = false;

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
  ) {

  }
  ngOnInit(): void {
    
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

// public form = new FormGroup({
//       accountDetails: new FormGroup({
//           userName: new FormControl('', Validators.required),
//           email: new FormControl('', [Validators.required, Validators.email]),
//           password: new FormControl('', Validators.required),
//           avatar: new FormControl(null)
//       }),
//       personalDetails: new FormGroup({
//           fullName: new FormControl('', [Validators.required]),
//           country: new FormControl('', [Validators.required]),
//           gender: new FormControl(null, [Validators.required]),
//           about: new FormControl('')
//       }),
//       paymentDetails: new FormGroup({
//           paymentType: new FormControl(null, Validators.required),
//           cardNumber: new FormControl('', Validators.required),
//           cvc: new FormControl('', [
//               Validators.required,
//               Validators.maxLength(3),
//               Validators.minLength(3)
//           ]),
//           expirationDate: new FormControl('', Validators.required),
//           cardHolder: new FormControl('', Validators.required)
//       })
//   });

//   public get currentGroup(): FormGroup {
//       return this.getGroupAt(this.currentStep);
//   }

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
  if(this.first_name !== null || this.first_name.trim() !== '') {
    const bool = this.modalService.messageAlert('Invalid product name.');
    return bool;
  }
  return true;
}

  // end file select function

}
