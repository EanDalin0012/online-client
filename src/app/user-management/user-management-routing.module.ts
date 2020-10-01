import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetPriceProductComponent } from './set-price-product/set-price-product.component';
import { UserMngAccComponent } from './user-mng-acc/user-mng-acc.component';
import { UserMngUserInfoComponent } from './user-mng-user-info/user-mng-user-info.component';


const routes: Routes = [
  {path: 'user-account', component: UserMngAccComponent},
  {path: 'user-info', component: UserMngUserInfoComponent},
  {path: 'set-price-product', component: SetPriceProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
