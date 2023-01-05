import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { EncapService } from '../encap/encap.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  eventEmitter = new EventEmitter<any>();
  
  constructor(private httpClient:HttpClient,
              private es:EncapService){ }

  isLoggedIn = false

  getUser(usr_id: any){
    return this.httpClient.get('http://localhost:3000/user/read/'+usr_id,{responseType:'json'})
  }
  setUser(message: any) {
    localStorage.setItem("usr_id",this.es.encrypt(message[0].USR_ID))
    localStorage.setItem("usr_role_id",this.es.encrypt(message[0].USR_ROLE_ID))
    localStorage.setItem('usr_name',this.es.encrypt(message[0].USR_NAME))
    localStorage.setItem('usr_email',this.es.encrypt(message[0].USR_EMAIL))
    localStorage.setItem('usr_mobile',this.es.encrypt(message[0].USR_MOBILE+''))
    if(message[0].USR_ROLE_ID == 'PA'){
      localStorage.setItem("usr_ptr_id",this.es.encrypt(message[0].USR_PTR_ID+''))
    }
    else if (message[0].USR_ROLE_ID == 'AA'){
      localStorage.setItem("usr_ptr_id",this.es.encrypt(message[0].USR_PTR_ID+''))
      localStorage.setItem("usr_acc_id",this.es.encrypt(message[0].USR_ACC_ID+''))
    }
    else{
      localStorage.setItem("usr_ptr_id",this.es.encrypt(message[0].USR_PTR_ID+''))
      localStorage.setItem("usr_acc_id",this.es.encrypt(message[0].USR_ACC_ID+''))
    }
    this.isLoggedIn = true
  }

  loginUser(usr_id: any, usr_password: any){
    return this.httpClient.get('http://localhost:3000/user/check/'+usr_id+'/'+usr_password,{responseType:'json'})
  }

  isUserLoggedIn(){
    return this.eventEmitter.emit(this.isLoggedIn)
  }
  
}
