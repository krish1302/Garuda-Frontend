import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AccountUserService } from 'src/app/service/account-user/account-user.service';
import { AccountService } from 'src/app/service/account/account.service';
import { EncapService } from 'src/app/service/encap/encap.service';
import { UsersService } from 'src/app/service/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  create = true
  Users !:any
  accountAdmin !:any

  constructor(private fb:FormBuilder, private us: UsersService, private snackBar:MatSnackBar, private activeRoute: ActivatedRoute, private router: Router, private aus: AccountUserService, private active: ActivatedRoute, private es:EncapService) { 
    if(this.es.decrypt(localStorage.getItem('usr_role_id')) == 'AA' && localStorage.getItem('usr_ptr_id') && localStorage.getItem('usr_acc_id')){
      if( !((this.es.decrypt(localStorage.getItem('usr_ptr_id')) != this.activeRoute.snapshot.paramMap.get('id')) && (this.es.decrypt(localStorage.getItem('usr_acc_id')) != this.activeRoute.snapshot.paramMap.get('acc_id'))) ){
        this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))])
      }
    }


    this.us.getUsers(this.activeRoute.snapshot.paramMap.get('id'), this.activeRoute.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.Users = data
    })

    this.aus.getAccountUsers(this.active.snapshot.paramMap.get('id'),this.active.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountAdmin = data
    })

  }

  ngOnInit(): void {
    this.us.getUsers(this.activeRoute.snapshot.paramMap.get('id'), this.activeRoute.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.Users = data
    })

    this.aus.getAccountUsers(this.active.snapshot.paramMap.get('id'),this.active.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountAdmin = data
    })
  }

  hint = {
    usr_id:'',
    usr_name:'',
    usr_password:'',
    usr_mobile:'',
    usr_email:'',
    usr_designation:''
  }

  userForm = this.fb.group({
   usr_id:[''],
   usr_name:[''],
   usr_password:[''],
   usr_mobile:[''],
   usr_email:[''],
   usr_designation:['']
  })

  openCreate(){
    this.create = true
    this.userForm.reset()
  }

  user(){
    var usr_id = this.userForm.get('usr_id')?.value
    var usr_name = this.userForm.get('usr_name')?.value
    var usr_password = this.userForm.get('usr_password')?.value
    var usr_mobile = this.userForm.get('usr_mobile')?.value
    var usr_email = this.userForm.get('usr_email')?.value
    var usr_designation = this.userForm.get('usr_designation')?.value

    var check = false
    var patt = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
    this.hint = {
      usr_id:'',
      usr_name:'',
      usr_password:'',
      usr_mobile:'',
      usr_email:'',
      usr_designation:''
    }

    if(!usr_id){
      this.hint.usr_id = 'user id is required'
    }
    else if(!usr_name){
      this.hint.usr_name = 'user name is required'
    }
    else if(!usr_password){
      this.hint.usr_password = 'user password is required'
    }
    else if(!usr_mobile){
      this.hint.usr_mobile = 'user mobile no is required'
    }
    else if(!usr_email){
      this.hint.usr_email = 'user email is required'
    }
    else if(!patt.test(usr_email)){
      this.hint.usr_email ='user email is mismatch pattern'
    }
    else if(!usr_designation){
      this.hint.usr_designation = 'user designation name is required'
    }
    else{
      document.getElementById('can')?.click()
      check = true
    }

    return check
  }

  createUser(){
    var local = this
    if(this.user()){
      var userDetails = {
        usr_id : this.userForm.get('usr_id')?.value,
        usr_name : this.userForm.get('usr_name')?.value,
        usr_password : this.userForm.get('usr_password')?.value,
        usr_mobile : this.userForm.get('usr_mobile')?.value,
        usr_email : this.userForm.get('usr_email')?.value,
        usr_designation : this.userForm.get('usr_designation')?.value,
        usr_acc_id:this.activeRoute.snapshot.paramMap.get('acc_id'),
        usr_ptr_id:this.activeRoute.snapshot.paramMap.get('id'),
        usr_role_id:'UA',
        usr_is_active:1,
        usr_start_date:moment().format("DD-MM-YYYY"),
        usr_start_time:moment().format("HH:mm a")
      }
      console.log(userDetails)
      document.getElementById('close')?.click()
      
      this.us.createUser(userDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        this.us.getUsers(this.activeRoute.snapshot.paramMap.get('id'), this.activeRoute.snapshot.paramMap.get('acc_id')).subscribe(data=>{
          this.Users = data
        })
      })

    }
  }

  updateUser(){
    var local = this
    if(this.user()){
      var userDetails = {
        usr_id : this.userForm.get('usr_id')?.value,
        usr_name : this.userForm.get('usr_name')?.value,
        usr_password : this.userForm.get('usr_password')?.value,
        usr_mobile : this.userForm.get('usr_mobile')?.value,
        usr_email : this.userForm.get('usr_email')?.value,
        usr_designation : this.userForm.get('usr_designation')?.value,
        usr_role_id:'UA'
      }
      document.getElementById('close')?.click()
      this.us.updateUser(userDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        this.us.getUsers(this.activeRoute.snapshot.paramMap.get('id'), this.activeRoute.snapshot.paramMap.get('acc_id')).subscribe(data=>{
          this.Users = data
        })

        local.userForm.reset()
      })
    }
  }

  update(id:any){
    var local = this
    this.us.getUser(id).subscribe(data=>{
      var ount = JSON.parse(JSON.stringify(data))
      local.userForm.setValue({
        usr_id:ount[0].USR_ID,
        usr_name:ount[0].USR_NAME,
        usr_password:ount[0].USR_PASSWORD,
        usr_mobile:ount[0].USR_MOBILE,
        usr_email:ount[0].USR_EMAIL,
        usr_designation:ount[0].USR_DESIGNATION,
      })
      local.create = false
    })
  }

  delete(id:any){
    var local = this
    var user = {
      usr_id: id,
      usr_stop_date:moment().format("DD-MM-YYYY"),
      usr_stop_time:moment().format("HH:mm a")
    }

    this.us.deleteUser(user).subscribe(data=>{
      var message = JSON.parse(JSON.stringify(data))
      local.snackBar.open(message.text,'okay',{
        duration: 5000
      })
      local.us.getUsers(this.activeRoute.snapshot.paramMap.get('id'), this.activeRoute.snapshot.paramMap.get('acc_id')).subscribe(data=>{
        local.Users = data
      })
    })
  }


  goToCamera(){
    this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))+'/camera'])
  }

  goToCameraMap(){
    this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))+'/usermap'])
  }


}
