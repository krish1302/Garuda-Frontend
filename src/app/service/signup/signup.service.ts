import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }


  createUser(user:any){
    return this.httpClient.post('http://localhost:3000/user/create',user,{responseType:'json'})
  }

}
