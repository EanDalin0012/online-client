import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegiVenComponent } from './regi-ven/regi-ven.component';
import { RegiProComponent } from './regi-pro/regi-pro.component';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [
   {path: 'category', component: CategoryComponent},
   {path: 'vendor', component: RegiVenComponent},
   {path: 'product', component: RegiProComponent},
  //  {path: 'view-product-detail', component: RegiProDetailViewsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
