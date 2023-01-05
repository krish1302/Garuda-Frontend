import { Component, OnInit } from '@angular/core';
import { CameraService } from 'src/app/service/camera/camera.service';
import { EncapService } from 'src/app/service/encap/encap.service';
import { UserMapService } from 'src/app/service/user-map/user-map.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  userCameras !: any
  user !:any
  camera_id !:any
  camera !:any
  constructor(private ums:UserMapService,
    private es: EncapService,
    private cs: CameraService) { 
    this.ums.getUsersCameras().subscribe(data =>{
      this.userCameras = data
    })

    this.user = this.es.decrypt(localStorage.getItem('usr_id'))
  }

  ngOnInit(): void {
  }


  openCamera(){
    var cam_id = this.camera_id

    this.cs.getCamera(cam_id).subscribe(data=>{
      this.camera = data
    })

  }

}
