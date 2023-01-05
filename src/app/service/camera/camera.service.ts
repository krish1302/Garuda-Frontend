import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private httpClient: HttpClient) { }

  getCameras(acc_id:any){
    return this.httpClient.get('http://localhost:3000/cameras/read/acc_id/'+acc_id,{responseType:'json'})
  }

  getCamera(cam_id:any){
    return this.httpClient.get('http://localhost:3000/camera/read/cam_id/'+cam_id,{responseType:'json'})
  }

  createCamera(camDetails:any){
    return this.httpClient.post('http://localhost:3000/camera/create',camDetails,{responseType:'json'})
  }

  updateCamera(camDetails:any){
    return this.httpClient.put('http://localhost:3000/camera/update',camDetails,{responseType:'json'})
  }

  // deleteCamera(camDetails:any){
  //   return this.httpClient.put('http://localhost:3000/cameras/delete/',camDetails,{responseType:'json'})
  // }


}
