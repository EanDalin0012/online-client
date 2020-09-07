import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Login1000Component } from './login1000/login1000.component';



@NgModule({
  declarations: [LoginComponent, Login1000Component],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
