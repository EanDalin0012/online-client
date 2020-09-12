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
    this.remember_me = Utils.getSecureStorage('remember_me');
    if(this.remember_me === true) {
      this.user_name = Utils.getSecureStorage('user_id');
    }
  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

  onClickLogin() {
    if(this.remember_me) {
      Utils.setSecureStorage('user_id', this.user_name)
    }

    const authenticationObj: AuthentcatiionRequest = {
      user_name: this.user_name,
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
    if(this.user_name !== '') {
      Utils.setSecureStorage('remember_me', this.remember_me);
      Utils.setSecureStorage('user_id', this.user_name)
    }
  }

  remember() {
    this.remember_me = !this.remember_me;
    Utils.setSecureStorage('remember_me', this.remember_me);
    Utils.removeSecureStorage('user_id');
    if(this.remember_me) {
      Utils.setSecureStorage('user_id', this.user_name)
    }
  }

}
