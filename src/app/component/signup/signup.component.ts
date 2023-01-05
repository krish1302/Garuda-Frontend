import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/service/signup/signup.service';
import { LoginService } from 'src/app/service/login/login.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  data :any
  hide = true
  hide1 = true
  
  constructor(private fb: FormBuilder, private ss: SignupService, private snackBar: MatSnackBar, private router: Router, private ls: LoginService) { 
    
  }
  
  

  ngOnInit(): void {
    this.ls.eventEmitter.subscribe(data =>{
      console.log(data)
    })
  }

  hint={
    usr_id: '',
    usr_name:'',
    usr_password:'',
    usr_mobile:'',
    usr_email:'',
    usr_designation:'',
    usr_role_id:''
  }

  signupForm = this.fb.group({
    usr_id:[''],
    usr_name:[''],
    usr_password:[''],
    usr_mobile:[''],
    usr_email:[''],
    usr_designation:[''],
    usr_role_id:['']
  })

  createSuperAdmin(){
    var usr_id = this.signupForm.get('usr_id')?.value
    var usr_name = this.signupForm.get('usr_name')?.value
    var usr_password = this.signupForm.get('usr_password')?.value
    var usr_mobile = this.signupForm.get('usr_mobile')?.value
    var usr_email = this.signupForm.get('usr_email')?.value
    var usr_designation = this.signupForm.get('usr_designation')?.value
    var usr_role_id = this.signupForm.get('usr_role_id')?.value

    var local = this

    var patt = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
    // console.log(patt.test(usr_email))

    
    this.hint={
      usr_id: '',
      usr_name:'',
      usr_password:'',
      usr_mobile:'',
      usr_email:'',
      usr_designation:'',
      usr_role_id:''
    }
    
    if(!usr_id){
      this.hint.usr_id ='user id is required'
    }
    else if(!(usr_id.length >= 5)){
      this.hint.usr_id ='user id have atleast 5 character'
    }
    else if(!usr_name){
      this.hint.usr_name ='user name is required'
    }
    else if(!usr_password){
      this.hint.usr_password ='user password is required'
    }
    else if(!usr_mobile){
      this.hint.usr_mobile ='user mobile is required and number only allowed'
    }
    else if(!usr_email){
      this.hint.usr_email ='user email is required'
    }
    else if(!patt.test(usr_email)){
      this.hint.usr_email ='user email is mismatch pattern'
    }
    else if(!usr_designation){
      this.hint.usr_designation ='user designation is required'
    }
    else if(!usr_role_id){
      this.hint.usr_role_id ='user secret code is required'
    }
    else if(usr_role_id == 'SA'){
      var partner ={
        usr_id: usr_id,
        usr_name:usr_name,
        usr_password:usr_password,
        usr_mobile:usr_mobile,
        usr_email:usr_email,
        usr_designation:usr_designation,
        usr_ptr_id:'',
        usr_acc_id:'',
        usr_role_id:usr_role_id,
        usr_start_date:moment().format("DD-MM-YYYY"),
        usr_start_time:moment().format("HH:mm a"),
        usr_active:1
      }
      this.ss.createUser(partner).subscribe( data =>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        if(!message.error){
          local.router.navigate(['/login'])
        }
        local.signupForm.reset()
      })

    }
    else{
      this.hint.usr_role_id ='user secret code is wrong'
    }
  }
}
