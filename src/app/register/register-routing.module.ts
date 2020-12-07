import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegiCateComponent } from './regi-cate/regi-cate.component';
import { RegiVenComponent } from './regi-ven/regi-ven.component';
import { RegiProComponent } from './regi-pro/regi-pro.component';
import { RegiProDetailViewsComponent } from './regi-pro-detail-views/regi-pro-detail-views.component';


const routes: Routes = [
   {path: 'category', component: RegiCateComponent},
   {path: 'vendor', component: RegiVenComponent},
   {path: 'product', component: RegiProComponent},
   {path: 'view-product-detail', component: RegiProDetailViewsComponent}
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
