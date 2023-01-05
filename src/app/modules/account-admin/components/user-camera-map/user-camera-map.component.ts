import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AccountUserService } from 'src/app/service/account-user/account-user.service';
import { CameraService } from 'src/app/service/camera/camera.service';
import { EncapService } from 'src/app/service/encap/encap.service';
import { UserMapService } from 'src/app/service/user-map/user-map.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-user-camera-map',
  templateUrl: './user-camera-map.component.html',
  styleUrls: ['./user-camera-map.component.css']
})
export class UserCameraMapComponent implements OnInit {

  users : any
  cameras : any
  userCameras : any
  accountAdmin !: any

  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router, 
    private fb: FormBuilder, 
    private us: UsersService,
    private cs: CameraService,
    private ums: UserMapService,
    private snackBar: MatSnackBar,
    private active: ActivatedRoute,
    private aus: AccountUserService,
    private es: EncapService
    ) {
    
      
      if(this.es.decrypt(localStorage.getItem('usr_role_id')) == 'AA' && localStorage.getItem('usr_ptr_id') && localStorage.getItem('usr_acc_id')){
        if( !((this.es.decrypt(localStorage.getItem('usr_ptr_id')) != this.activeRoute.snapshot.paramMap.get('id')) && (this.es.decrypt(localStorage.getItem('usr_acc_id')) != this.activeRoute.snapshot.paramMap.get('acc_id'))) ){
          this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))+'/usermap'])
        }
      }

    this.us.getUsers(this.activeRoute.snapshot.paramMap.get('id'), this.activeRoute.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.users = data
    })

    this.cs.getCameras(localStorage.getItem("usr_acc_id")).subscribe(data=>{
      this.cameras = data
    })

    this.ums.getUsersCameras().subscribe(data=>{
      this.userCameras = data
    })

    this.aus.getAccountUsers(this.active.snapshot.paramMap.get('id'),this.active.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountAdmin = data
    })

   }

  ngOnInit(): void {
    
    this.us.getUsers(this.activeRoute.snapshot.paramMap.get('id'), this.activeRoute.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.users = data
    })

    this.cs.getCameras(this.es.decrypt(localStorage.getItem("usr_acc_id"))).subscribe(data=>{
      this.cameras = data
    })
    
    this.aus.getAccountUsers(this.active.snapshot.paramMap.get('id'),this.active.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountAdmin = data
    })
    
  }

  userCameraForm = this.fb.group({
    usr_id:[''],
    cam_id:['']
  })

  hint={
    usr_id:'',
    cam_id:''
  }

  camera(){
    var usr_id = this.userCameraForm.get('usr_id')?.value
    var cam_id = this.userCameraForm.get('cam_id')?.value
    
    this.hint={
      usr_id:'',
      cam_id:''
    }

    var check = false
    
    if(!usr_id){
      this.hint.usr_id = 'user id is required'
    }
    else if(!cam_id){
      this.hint.cam_id = 'camera id is required'
    }
    else{
      document.getElementById('can')?.click()
      check = true
    }

    return check

  }


  createUserCamera(){
    var local = this
    if(this.camera()){
      var userMap = {
        cum_usr_id : this.userCameraForm.get('usr_id')?.value,
        cum_cam_id : this.userCameraForm.get('cam_id')?.value,
        cum_start_date:moment().format("DD-MM-YYYY"),
        cum_start_time:moment().format("HH:mm a")
      }
      document.getElementById('close')?.click()
      this.ums.createUserCamera(userMap).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })

        local.ums.getUsersCameras().subscribe(data=>{
          local.userCameras = data
        })
      })
    }
  }


  deleteUserCamera(id : any, cam_id: any){
    var local = this
      var userMap = {
        cum_usr_id : id,
        cum_cam_id : cam_id,
        cum_stop_date:moment().format("DD-MM-YYYY"),
        cum_stop_time:moment().format("HH:mm a")
      }

      this.ums.deleteUserCamera(userMap).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        console.log(message)
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })

        local.ums.getUsersCameras().subscribe(data=>{
          local.userCameras = data
        })
      })
  }

  goBack(){
    this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))])
  }
}
