import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home1000Component } from './home1000/home1000.component';
import { CkeditorComponent } from './ckeditor/ckeditor.component';
import { Home2000Component } from './home2000/home2000.component';
import { Home1100Component } from './home1100/home1100.component';
import { Home1200Component } from './home1200/home1200.component';
import { ListKIconComponent } from './list-k-icon/list-k-icon.component';


const routes: Routes = [
  {path: '', component: Home1000Component},
  {path: 'home110', component: Home1100Component},
  {path: 'ckeditor', component: CkeditorComponent},
  {path: 'home220', component: Home1200Component},
  {path: 'home200', component: Home2000Component},
  {path: 'icon', component: ListKIconComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
