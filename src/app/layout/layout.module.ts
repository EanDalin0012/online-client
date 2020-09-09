import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutBlankComponent } from './layout-blank/layout-blank.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SettingsComponent } from './settings/settings.component';
import { SideNavComponent } from './side-nav/side-nav.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SettingsComponent,
    SideNavComponent
  ]
})
export class LayoutModule { }
