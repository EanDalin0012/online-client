import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './error/error404/error404.component';
import { Error405Component } from './error/error405/error405.component';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { MLayoutModule } from './layout/layout.module';
import { MShareModule } from './share/mshare/mshare.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './share/service/auth-interceptor.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutBlankComponent,
    LayoutComponent,
    Error404Component,
    Error405Component
  ],
  imports: [
    AppRoutingModule,
    MLayoutModule,
    MShareModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
