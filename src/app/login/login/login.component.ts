import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentcatiionRequest, AuthentcatiionService } from 'src/app/share/service/authentication.service';
import { ServerService } from 'src/app/share/service/server.service';
import { Utils } from 'src/app/share/utils/utils.static';
declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_name: string;
  password: string;
  remember_me: boolean = false;

  @ViewChild('passwordElement') passwordElement: ElementRef;

  constructor(
    private authentcatiionService: AuthentcatiionService
  ) {
  }

  ngOnInit() {
    $('body').addClass('hold-transition login-page');
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });
    this.remember_me = Utils.getSecureStorage('rememberMe');
    if(this.remember_me === true) {
      this.user_name = Utils.getSecureStorage('UserID');
    }
  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

  onClickLogin() {
    if(this.remember_me) {
      Utils.setSecureStorage('UserID', this.user_name)
    }

    const authenticationObj: AuthentcatiionRequest = {
      username: this.user_name,
      password: this.password
    };
    this.authentcatiionService.login(authenticationObj);
  }

  enterLoginHandler(event: any) {
    if (event.keyCode === 13 && this.user_name !== '' && this.password !== '') {
      this.onClickLogin();
    } else if (event.keyCode === 13 && this.user_name !== '') {
      this.passwordElement.nativeElement.focus();
    }
  }

  tapfocus(event: any) {
    const element = event.srcElement.nextElementSibling;
    if (event.keyCode === 9) {
      element.focus();
    }
  }
  
  clickRememberMe() {
    alert();
    console.log(this.user_name);
    if(this.user_name !== '') {
      Utils.setSecureStorage('rememberMe', this.remember_me);
      Utils.setSecureStorage('UserID', this.user_name)
    }
  }

  toggleVisibility(e){
    alert(e.target.checked);
  }

  remember() {
    this.remember_me = !this.remember_me;
    console.log(this.remember_me);
    Utils.setSecureStorage('rememberMe', this.remember_me);
    Utils.removeSecureStorage('UserID');
    if(this.remember_me) {
      Utils.setSecureStorage('UserID', this.user_name)
    }
  }

}
