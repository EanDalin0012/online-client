import { CryptoService } from './crypto.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse  } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import * as $ from 'jquery';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LOCAL_STORAGE, AES_INFO } from '../constants/common.const';
import { ModalService } from './modal.service';
import { Utils } from '../utils/utils.static';

declare let CryptoJS: any;

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private timeoutmillsec = 120000;
  private longtimeApis = ['MAN1006'];

 constructor(
    private translate: TranslateService,
    private router: Router,
    private zone: NgZone,
    private modal: ModalService,
    private modalService: ModalService,
    private cryptoService: CryptoService
  ) {

  }


  decrypt(plaintext, password) {
    return CryptoJS.AES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(plaintext.substring(32))
    }, CryptoJS.enc.Hex.parse(CryptoJS.SHA1(password).toString().substring(0, 32)),
    {
      iv: CryptoJS.enc.Hex.parse(plaintext.substring(0, 32)),
    }).toString(CryptoJS.enc.Utf8);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    Utils.setSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME, String(new Date().getTime()));
    // tslint:disable-next-line: prefer-for-of
    for ( let idx = 0 ; idx < this.longtimeApis.length ; idx++ ) {
      if ( req.url.indexOf(this.longtimeApis[idx]) > 0 ){
        environment.production ? (() => '')() : console.log('timeout sec changed.');
        this.timeoutmillsec = 2 * 60 * 1000;
        break;
    }
  }

    // console.log('new headers', clonedRequest.headers.keys());
    return next.handle(req).timeout(this.timeoutmillsec).map(event => {
      // if (environment.encryptionUse) {
      //   const aesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
      //   if (event instanceof HttpResponse) {
      //     event = event.clone({ body: {
      //       header: event.body.header,
      //       body: JSON.parse(this.decrypt(event.body.body, aesInfo.aesKey))
      //     }});
      //   }
      // }

      if (event instanceof HttpResponse) {
        const bodyData = event.body.body;
        console.log('data', event.body.header);
        const data = JSON.parse(this.cryptoService.decrypt(bodyData.body));
        console.log('data', data);
        // event = event.clone({ body: {
        //   header: event.body.header,
        //   body: JSON.parse(event.body.body)
        // }});
      }

        // if (event instanceof HttpResponse){
        //   // environment.production ? (() => '')() : console.log(' Response Code : ' + apiname);
        //   environment.production ? (() => '')() : console.log(event.body);
        // }
      // "CBK_SES_001"
      console.log("reqreqreq", req);

      return event;
    }).pipe(finalize(() => {
        environment.production ? (() => '')() : console.log('Communicate finish.');
        // $('div.loading').addClass('none') ;
      })
    ).catch((error) => {
      console.log('error', error);
      if ( Number(error.status) === 401) {
        this.router.navigate(['/login']);
        this.modalService.alert({
          title: error.error.error,
          content:  '<p>'+ error.error.error_description+'</p>',
          modalClass: ['message-alert testing, open-alert'],
          btnText: 'Confirm',
          callback: (res) => {
          }
        });
      }
      if (error && error.status === 0) {
          this.modalService.alert({
            content:  'message : <span>Connection faile</span> status: ' + error.statusText,
            modalClass: ['message-alert testing, open-alert'],
            btnText: 'Confirm',
            callback: (res) => {
              return false;
            }
          });
      }
      environment.production ? (() => '')() : console.log(req.url + ' reqeusting failed. ' );
      let httpErrorCode;
      if (error.status){
        httpErrorCode = error.status;
      } else {
        httpErrorCode = '999999';
      }


      console.log(typeof error.status + ' : ' + error.statusText);
      environment.production ? (() => '')() : console.log(error.name + ' : ' + error.message);

      return Observable.of(new HttpResponse({body: { header: {result: false, resultCode: httpErrorCode }, body: {}} }));
    }) as any;
  }

  showErrMsg(msgKey: string){
    this.translate.get('COMMON.ERROR').subscribe( message => {
      if (msgKey === 'NOTLOGIN'){
        this.modal.alert({
          content : message[msgKey],
          callback : () => {
            this.zone.run(() =>  this.router.navigate(['/login']));
          }
        });
      } else {
        this.modal.alert({
          content : message[msgKey]
        });
      }
    });
  }
}
