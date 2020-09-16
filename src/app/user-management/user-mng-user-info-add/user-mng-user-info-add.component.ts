import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperComponent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-user-mng-user-info-add',
  templateUrl: './user-mng-user-info-add.component.html',
  styleUrls: ['./user-mng-user-info-add.component.css']
})
export class UserMngUserInfoAddComponent implements OnInit {
 
  currentGroup= 'abcd';
  ngOnInit(): void {
    
  }

  public currentStep = 0;

  @ViewChild('stepper', { static: true })
  public stepper: StepperComponent;

  private isStepValid = (index: number): boolean => {
      return true;
  }

  private shouldValidate = (index: number): boolean => {
      return false;
  }

  public steps = [
      {
          label: 'User Information',
          isValid: this.isStepValid,
          icon:"user",
          selected: true,
          validate: this.shouldValidate
      },
      {
          label: 'Personal Details',
          isValid: true,
          // icon: 'account',
          enabled: true,
          error: true,
          validate: true
      },
      {
          label: 'Payment Details',
          isValid: this.isStepValid,
          validate: this.shouldValidate
      },
      {
        label: 'Payment Details',
        isValid: this.isStepValid,
        validate: this.shouldValidate
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
     this.currentStep += 1;
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

}
