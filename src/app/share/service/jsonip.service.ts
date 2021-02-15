import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonipService {

  constructor(private http: HttpClient) { }

  public jsonIp(): Promise<string> {
      return new Promise( resolve => {
        this.http.get<{ip: string}>('https://jsonip.com').subscribe( data => {
          const ipAddress = data as any;
          resolve(ipAddress.ip);
        });
      });
  }
}
