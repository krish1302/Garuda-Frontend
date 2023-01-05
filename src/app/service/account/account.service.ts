import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient){}

  getAccounts(partner_id:any){
    return this.httpClient.get('http://localhost:3000/accounts/read/'+partner_id,{responseType:'json'})
  }

  getAccount(partner_id:any, account_id: any){
    return this.httpClient.get('http://localhost:3000/account/read/'+partner_id+'/'+account_id,{responseType:'json'})
  }

  createAccount(partner:any){
    return this.httpClient.post('http://localhost:3000/account/create',partner,{responseType:'json'})
  }

  updateAccount(partner:any){
    return this.httpClient.put('http://localhost:3000/account/update',partner,{responseType:'json'})
  }

  deleteAccount(partner:any){
    return this.httpClient.put('http://localhost:3000/account/delete',partner,{responseType:'json'})
  }
}
