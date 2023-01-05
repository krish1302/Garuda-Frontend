import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartnerUserService {

  constructor(private httpClient: HttpClient) { }

  getPartnerUsers(usr_ptr_id:any){
    return this.httpClient.get('http://localhost:3000/users/read/'+usr_ptr_id,{responseType:'json'})
  }

  getPartnerUser(usr_id:any){
    return this.httpClient.get('http://localhost:3000/user/read/'+usr_id,{responseType:'json'})
  }

  createPartnerUser(partnerUser:any){
    return this.httpClient.post('http://localhost:3000/user/create',partnerUser,{responseType:'json'})
  }

  updatePartnerUser(partnerUser:any){
    return this.httpClient.put('http://localhost:3000/user/update',partnerUser,{responseType:'json'})
  }

  deletePartnerUser(partnerUser:any){
    return this.httpClient.put('http://localhost:3000/user/delete',partnerUser,{responseType:'json'})
  }

}


