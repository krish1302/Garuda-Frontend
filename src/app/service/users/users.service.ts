import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient){}

  getUsers(usr_ptr_id:any, usr_acc_id:any){
    return this.httpClient.get('http://localhost:3000/read/user/'+usr_ptr_id+'/'+usr_acc_id,{responseType:'json'})
  }

  getUser(usr_id:any){
    return this.httpClient.get('http://localhost:3000/user/read/'+usr_id,{responseType:'json'})
  }

  createUser(user:any){
    return this.httpClient.post('http://localhost:3000/user/create',user,{responseType:'json'})
  }

  updateUser(user:any){
    return this.httpClient.put('http://localhost:3000/user/update',user,{responseType:'json'})
  }

  deleteUser(user:any){
    return this.httpClient.put('http://localhost:3000/user/delete',user,{responseType:'json'})
  }

}
