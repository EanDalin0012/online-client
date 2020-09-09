import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Login1000Component } from './login1000/login1000.component';
import { LoginRoutingModule } from './login-routing.module';



@NgModule({
  declarations: [
    LoginComponent, 
    Login1000Component],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
