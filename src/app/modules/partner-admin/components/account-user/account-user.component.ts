import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AccountUserService } from 'src/app/service/account-user/account-user.service';
import { AccountService } from 'src/app/service/account/account.service';
import { EncapService } from 'src/app/service/encap/encap.service';
@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.css']
})
export class AccountUserComponent implements OnInit {
  create = true
  accountUsers !:any
  accountAdmin !:any
  constructor(private fb:FormBuilder,
      private aus: AccountUserService,
      private snackBar:MatSnackBar,
      private router: ActivatedRoute, 
      private as: AccountService, 
      private route: Router,
      private es: EncapService) { 
    
    if(this.es.decrypt(localStorage.getItem('usr_role_id')) == 'PA' && localStorage.getItem('usr_ptr_id') && !localStorage.getItem('usr_acc_id')){
      if(this.es.decrypt(localStorage.getItem('usr_ptr_id')) != this.router.snapshot.paramMap.get('id')){
        this.route.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account'])
      }
    }
    else{
      this.route.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))])
    }

    
    this.aus.getAccountUsers(this.router.snapshot.paramMap.get('id'), this.router.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountUsers = data
    })

    this.as.getAccount(this.router.snapshot.paramMap.get('id'), this.router.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountAdmin = data
    })

  }

  ngOnInit(): void {
    this.aus.getAccountUsers(this.router.snapshot.paramMap.get('id'), this.router.snapshot.paramMap.get('acc_id')).subscribe(data=>{
      this.accountUsers = data
    })

    this.as.getAccount(this.router.snapshot.paramMap.get('id'), this.router.snapshot.paramMap.get('acc_id')).subscribe(data=>{
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

  accUserForm = this.fb.group({
   usr_id:[''],
   usr_name:[''],
   usr_password:[''],
   usr_mobile:[''],
   usr_email:[''],
   usr_designation:['']
  })


  openCreate(){
    this.create = true
    this.accUserForm.reset()
  }

  account(){
    var usr_id = this.accUserForm.get('usr_id')?.value
    var usr_name = this.accUserForm.get('usr_name')?.value
    var usr_password = this.accUserForm.get('usr_password')?.value
    var usr_mobile = this.accUserForm.get('usr_mobile')?.value
    var usr_email = this.accUserForm.get('usr_email')?.value
    var usr_designation = this.accUserForm.get('usr_designation')?.value

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

  createAccountUser(){
    var local = this
    if(this.account()){
      var accountDetails = {
        usr_id : this.accUserForm.get('usr_id')?.value,
        usr_name : this.accUserForm.get('usr_name')?.value,
        usr_password : this.accUserForm.get('usr_password')?.value,
        usr_mobile : this.accUserForm.get('usr_mobile')?.value,
        usr_email : this.accUserForm.get('usr_email')?.value,
        usr_designation : this.accUserForm.get('usr_designation')?.value,
        usr_acc_id:this.router.snapshot.paramMap.get('acc_id'),
        usr_ptr_id:this.router.snapshot.paramMap.get('id'),
        usr_role_id:'AA',
        usr_is_active:1,
        usr_start_date:moment().format("DD-MM-YYYY"),
        usr_start_time:moment().format("HH:mm a")
      }
      //console.log(accountDetails)
      document.getElementById('close')?.click()
      //console.log(this.router.snapshot.paramMap.get('id'), this.router.snapshot.paramMap.get('acc_id'))
      
      this.aus.createAccountUser(accountDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        local.aus.getAccountUsers(this.router.snapshot.paramMap.get('id'), this.router.snapshot.paramMap.get('acc_id')).subscribe(data=>{
          local.accountUsers = data
        })
      })

    }
  }

  updateAccountUser(){
    var local = this
    if(this.account()){
      var accountDetails = {
        usr_id : this.accUserForm.get('usr_id')?.value,
        usr_name : this.accUserForm.get('usr_name')?.value,
        usr_password : this.accUserForm.get('usr_password')?.value,
        usr_mobile : this.accUserForm.get('usr_mobile')?.value,
        usr_email : this.accUserForm.get('usr_email')?.value,
        usr_designation : this.accUserForm.get('usr_designation')?.value,
        usr_role_id:'AA'
      }
      document.getElementById('close')?.click()
      this.aus.updateAccountUser(accountDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        local.aus.getAccountUsers(this.router.snapshot.paramMap.get('id'),this.router.snapshot.paramMap.get('acc_id')).subscribe(data=>{
          local.accountUsers = data
        })

        local.accUserForm.reset()
      })
    }
  }

  update(id:any){
    var local = this
    this.aus.getAccountUser(id).subscribe(data=>{
      var account = JSON.parse(JSON.stringify(data))
      local.accUserForm.setValue({
        usr_id:account[0].USR_ID,
        usr_name:account[0].USR_NAME,
        usr_password:account[0].USR_PASSWORD,
        usr_mobile:account[0].USR_MOBILE,
        usr_email:account[0].USR_EMAIL,
        usr_designation:account[0].USR_DESIGNATION,
      })
      local.create = false
    })
  }

  delete(id:any){
    var local = this
    var account = {
      usr_id: id,
      usr_stop_date:moment().format("DD-MM-YYYY"),
      usr_stop_time:moment().format("HH:mm a")
    }

    this.aus.deleteAccountUser(account).subscribe(data=>{
      var message = JSON.parse(JSON.stringify(data))
      local.snackBar.open(message.text,'okay',{
        duration: 5000
      })
      local.aus.getAccountUsers(this.router.snapshot.paramMap.get('id'), this.router.snapshot.paramMap.get('acc_id')).subscribe(data=>{
        local.accountUsers = data
      })
    })
  }


  goBack(){
    this.route.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account'])
  }

}



