import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMngAccComponent } from './user-mng-acc/user-mng-acc.component';


const routes: Routes = [
  {path: '', component: UserMngAccComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
