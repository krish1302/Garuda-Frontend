import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMapService {

  constructor(private httpClient: HttpClient) { }

  getUsersCameras(){
    return this.httpClient.get('http://localhost:3000/user_map/read')
  }

  createUserCamera(userMap: any){
   return this.httpClient.post('http://localhost:3000/user_map/create', userMap, {responseType: 'json'})
  }


  deleteUserCamera(userMap: any){
   return this.httpClient.put('http://localhost:3000/user_map/delete', userMap, {responseType:'json'})
  }

}
