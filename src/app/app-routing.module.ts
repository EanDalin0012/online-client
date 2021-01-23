import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { Error404Component } from './error/error404/error404.component';
import { Error405Component } from './error/error405/error405.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'main', component: LayoutComponent, loadChildren: './mng-module/mng-module.module#MngModuleModule'},
  {path: 'login', component: LayoutBlankComponent, loadChildren: './login/login.module#LoginModule'},
  { path: 'announce/4error', component: Error404Component },
  { path: 'announce/5error', component: Error405Component },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
