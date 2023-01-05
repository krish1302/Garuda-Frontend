import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AccountUserService } from 'src/app/service/account-user/account-user.service';
import { CameraService } from 'src/app/service/camera/camera.service';
import { EncapService } from 'src/app/service/encap/encap.service';
@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.css']
})
export class CamerasComponent implements OnInit {

  create = true
  cameras : any
  accountAdmin !:any

  constructor(private fb: FormBuilder, 
    private cs: CameraService, 
    private snackBar: MatSnackBar, 
    private router: Router, 
    private active: ActivatedRoute, 
    private aus: AccountUserService,
    private es:EncapService) {

    this.cs.getCameras(this.es.decrypt(localStorage.getItem("usr_acc_id"))).subscribe(data=>{
      this.cameras = data
    })

    this.aus.getAccountUsers(this.active.snapshot.paramMap.get('id'),this.active.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountAdmin = data
    })

    if(this.es.decrypt(localStorage.getItem('usr_role_id')) == 'AA' && localStorage.getItem('usr_ptr_id') && localStorage.getItem('usr_acc_id')){
      if( !((this.es.decrypt(localStorage.getItem('usr_ptr_id')) != this.active.snapshot.paramMap.get('id')) && (this.es.decrypt(localStorage.getItem('usr_acc_id')) != this.active.snapshot.paramMap.get('acc_id'))) ){
        this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))+'/camera'])
      }
    }

  }

  ngOnInit(): void {
    this.cs.getCameras(this.es.decrypt(localStorage.getItem("usr_acc_id"))).subscribe(data=>{
      this.cameras = data
    })

    this.aus.getAccountUsers(this.active.snapshot.paramMap.get('id'),this.active.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountAdmin = data
    })

  }


  cameraForm = this.fb.group({
    cam_id:[''],
    cam_dvr_ip:[''],
    cam_channel:[''],
    cam_poc:[''],
    cam_location:[''],
    cam_alarm_code:[''],
    cam_fps:[''],
    cam_username:[''],
    cam_password:[''],
    cam_port:['']
  })

  hint = {
    cam_dvr_ip:'',
    cam_channel:'',
    cam_poc:'',
    cam_location:'',
    cam_alarm_code:'',
    cam_fps:'',
    cam_username:'',
    cam_password:'',
    cam_port:''
  }

  camera(){
    var cam_dvr_ip= this.cameraForm.get('cam_dvr_ip')?.value
    var cam_channel= this.cameraForm.get('cam_channel')?.value
    var cam_poc = this.cameraForm.get('cam_poc')?.value
    var cam_location = this.cameraForm.get('cam_location')?.value
    var cam_alarm_code = this.cameraForm.get('cam_alarm_code')?.value
    var cam_fps = this.cameraForm.get('cam_fps')?.value
    var cam_username = this.cameraForm.get('cam_username')?.value
    var cam_password = this.cameraForm.get('cam_password')?.value
    var cam_port = this.cameraForm.get('cam_port')?.value

    var check = false

    this.hint = {
      cam_dvr_ip:'',
      cam_channel:'',
      cam_poc:'',
      cam_location:'',
      cam_alarm_code:'',
      cam_fps:'',
      cam_username:'',
      cam_password:'',
      cam_port:''
    }

    if(!cam_dvr_ip){
      this.hint.cam_dvr_ip = 'camera dvr ip is required'
    }
    else if(!cam_channel){
      this.hint.cam_channel = 'camera channel is required'
    }
    else if(!cam_poc){
      this.hint.cam_poc = 'camera poc is required'
    }
    else if(!cam_location){
      this.hint.cam_location = 'camera location no is required'
    }
    else if(!cam_alarm_code){
      this.hint.cam_alarm_code = 'camera alarm code is required'
    }
    else if(!cam_fps){
      this.hint.cam_fps = 'camera fps is required'
    }
    else if(!cam_username){
      this.hint.cam_username = 'camera username is required'
    }
    else if(!cam_password){
      this.hint.cam_password = 'camera password is required'
    }
    else if(!cam_port){
      this.hint.cam_port = 'camera port is required'
    }
    else{
      document.getElementById('can')?.click()
      check = true
    }

    return check
  }

  createCamera(){
    var local = this

    if(this.camera()){
      var camDetails = {
        cam_dvr_ip: this.cameraForm.get('cam_dvr_ip')?.value,
        cam_acc_id:localStorage.getItem('usr_acc_id'),
        cam_channel:this.cameraForm.get('cam_channel')?.value,
        cam_poc:this.cameraForm.get('cam_poc')?.value,
        cam_location: this.cameraForm.get('cam_location')?.value,
        cam_alarm_code:this.cameraForm.get('cam_alarm_code')?.value,
        cam_fps:this.cameraForm.get('cam_fps')?.value,
        cam_username:this.cameraForm.get('cam_username')?.value,
        cam_password:this.cameraForm.get('cam_password')?.value,
        cam_port:this.cameraForm.get('cam_port')?.value,
        cam_start_date:moment().format("DD-MM-YYYY"),
        cam_start_time:moment().format("HH:mm a")
      }
      document.getElementById('close')?.click()
      this.cs.createCamera(camDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        this.cs.getCameras(localStorage.getItem("usr_acc_id")).subscribe(data=>{
          this.cameras = data
        })
      })

    }
    
  }

  updateCamera(){
    var local = this
    if(this.camera()){
      var camDetails = {
        cam_id: this.cameraForm.get('cam_id')?.value,
        cam_dvr_ip: this.cameraForm.get('cam_dvr_ip')?.value,
        cam_channel:this.cameraForm.get('cam_channel')?.value,
        cam_poc:this.cameraForm.get('cam_poc')?.value,
        cam_location: this.cameraForm.get('cam_location')?.value,
        cam_alarm_code:this.cameraForm.get('cam_alarm_code')?.value,
        cam_fps:this.cameraForm.get('cam_fps')?.value,
        cam_username:this.cameraForm.get('cam_username')?.value,
        cam_password:this.cameraForm.get('cam_password')?.value,
        cam_port:this.cameraForm.get('cam_port')?.value
      }
      document.getElementById('close')?.click()
      this.cs.updateCamera(camDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        this.cs.getCameras(this.es.decrypt(localStorage.getItem("usr_acc_id"))).subscribe(data=>{
          this.cameras = data
        })

        local.cameraForm.reset()
      })
    }

  }

  update(id:any){
    var local = this
    
    this.cs.getCamera(id).subscribe(data=>{
      var cam = JSON.parse(JSON.stringify(data))
      local.cameraForm.setValue({
        cam_id:cam[0].CAM_ID,
        cam_dvr_ip:cam[0].CAM_DVR_IP,
        cam_channel:cam[0].CAM_CHANNEL,
        cam_poc:cam[0].CAM_POC,
        cam_location:cam[0].CAM_LOCATION,
        cam_alarm_code:cam[0].CAM_ALARM_CODE,
        cam_fps:cam[0].CAM_FPS,
        cam_username:cam[0].CAM_USERNAME,
        cam_password:cam[0].CAM_PASSWORD,
        cam_port:cam[0].CAM_PORT,
      })
      this.create = false
    })

  }


  goBack(){
    this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))])
  }

}
