import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login1000Component } from './login1000/login1000.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
