import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountUserService {

  constructor(private httpClient: HttpClient) { }

  getAccountUsers(usr_ptr_id:any, usr_acc_id:any){
    return this.httpClient.get('http://localhost:3000/users/read/'+usr_ptr_id+'/'+usr_acc_id,{responseType:'json'})
  }

  getAccountUser(usr_id:any){
    return this.httpClient.get('http://localhost:3000/user/read/'+usr_id,{responseType:'json'})
  }

  createAccountUser(accountUser:any){
    return this.httpClient.post('http://localhost:3000/user/create',accountUser,{responseType:'json'})
  }

  updateAccountUser(accountUser:any){
    return this.httpClient.put('http://localhost:3000/user/update',accountUser,{responseType:'json'})
  }

  deleteAccountUser(accountUser:any){
    return this.httpClient.put('http://localhost:3000/user/delete',accountUser,{responseType:'json'})
  }

}



