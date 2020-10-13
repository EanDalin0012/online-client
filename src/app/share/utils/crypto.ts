import * as CryptoJS from 'crypto-js';
export abstract class CryptoUtil {

    public static encryptUsingAES256(tokenFromUI: string, request): string {
        let _key = CryptoJS.enc.Utf8.parse(tokenFromUI);
        let _iv = CryptoJS.enc.Utf8.parse(tokenFromUI);
        let encrypted = CryptoJS.AES.encrypt(
          JSON.stringify(request), _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
        return encrypted.toString();
    }

    public static decryptUsingAES256(encrypted: string, tokenFromUI: string) {
        let _key = CryptoJS.enc.Utf8.parse(tokenFromUI);
        let _iv = CryptoJS.enc.Utf8.parse(tokenFromUI);
    
        const decrypted = CryptoJS.AES.decrypt(
          encrypted, _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          }).toString(CryptoJS.enc.Utf8);
          return decrypted;
      }
}