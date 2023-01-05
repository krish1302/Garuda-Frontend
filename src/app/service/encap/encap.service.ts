import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class EncapService {

  constructor() { }

  encrypt(str :any){
    return CryptoJS.AES.encrypt(str,'secret key 123').toString()
  }

  decrypt(str :any){
    return CryptoJS.AES.decrypt( str || '','secret key 123').toString(CryptoJS.enc.Utf8)
  }

  // setInterval(()=>{
    //   var encap = localStorage.getItem('encap') || ''

    //   var byte = CryptoJS.AES.decrypt(encap,'secret key 123')
    //   alert(byte.toString(CryptoJS.enc.Utf8))
      
    // },3000)

}
