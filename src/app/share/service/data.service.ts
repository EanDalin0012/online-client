import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private visitSource =  new BehaviorSubject<any>('');
  visitData = this.visitSource.asObservable();

  private viewProductDetail =  new BehaviorSubject<any>('');
  viewProductDetailData = this.visitSource.asObservable();

  visitMessage(message: any) {
    console.log('message', message);
    this.visitSource.next(message);
  }

  viewProductDetailMessage(message: any) {
    console.log('viewProductDetailMessage', message);
    this.viewProductDetail.next(message);
  }
}
