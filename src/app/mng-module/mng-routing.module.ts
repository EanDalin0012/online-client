import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { RegiComponent } from '../register/regi/regi.component';
import { UserManagementComponent } from '../user-management/user-management/user-management.component';

const routes: Routes = [
  { path: 'main', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomeModule'
      }
    ]
  },
  {
    path: '', component: RegiComponent,
    children: [
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterModule'
      }
    ]
  },
  {
    path: '', component: UserManagementComponent,
    children: [
      {
        path: 'user-mng',
        loadChildren: '../user-management/user-management.module#UserManagementModule'
      }
    ]
  },
  {
    path: '', component: UserManagementComponent,
    children: [
      {
        path: 'import',
        loadChildren: '../import/import.module#ImportModule'
      }
    ]
  },
  {
    path: '', component: UserManagementComponent,
    children: [
      {
        path: 'export',
        loadChildren: '../export/export.module#ExportModule'
      }
    ]
  },
  {
    path: '', component: UserManagementComponent,
    children: [
      {
        path: 'sale',
        loadChildren: '../sale/sale.module#SaleModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
