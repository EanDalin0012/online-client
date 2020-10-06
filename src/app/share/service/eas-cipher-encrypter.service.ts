import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EasCipherEncrypterService {

  constructor() { }

  encryptWithKey():Promise<any> {
    return new Promise(resolve =>{
      // const key1 = new Buffer('6d7956657279546f705365637265744b', 'hex');
      // cipher = crypto.createCipher('aes-128-ecb', key),

      // const key = "data";
      // const rawdata = {
      //   a: 'a',
      //   b:'a'
      // };
      // let encrypted = CryptoJS.AES.encrypt(JSON.stringify(rawdata), key);
    });
  }

  decryptWithKey():Promise<any> {
    return new Promise(resolve =>{
      
    });

  }
}
