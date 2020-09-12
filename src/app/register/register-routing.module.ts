import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegiCateComponent } from './regi-cate/regi-cate.component';


const routes: Routes = [
   {path: '', component: RegiCateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
