import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EncapService } from 'src/app/service/encap/encap.service';
import { LoginService } from 'src/app/service/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true

  constructor(private fb:FormBuilder, private ls: LoginService, private snackBar: MatSnackBar, private router: Router, private es: EncapService) {
    let usr_role_id = this.es.decrypt(localStorage.getItem('usr_role_id'))

    if(usr_role_id){
      switch(usr_role_id){
        case 'SA':
          this.router.navigate(['/super/partner'])
          break;
        case 'PA':
          console.log('/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account')
          this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account'])
          break;
        case 'AA':
          this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))])
          break;
        case 'UA':
          this.router.navigate(['/user'])
          break;
      }
    }
  }

  ngOnInit(): void {
    
  }

  loginForm = this.fb.group({
    user_id:[''],
    user_password:['']
  })
  hint = {
    usr_id:'',
    usr_pass: ''
  }

  login(){
    var local = this
    var usr_id = this.loginForm.get('user_id')?.value
    var user_password = this.loginForm.get('user_password')?.value

    this.hint = {
      usr_id:'',
      usr_pass: ''
    }

    if(!usr_id){
      this.hint.usr_id = 'user id is required'
    }
    else if(!user_password){
      this.hint.usr_pass = 'password is required'
    }
    else{
      
    this.ls.loginUser(usr_id, user_password).subscribe(data=>{
      var message = JSON.parse(JSON.stringify(data))
      
      local.snackBar.open(message.text,'okay',{
        duration: 5000
      })

      if(message.error){
        local.router.navigate(['/login'])
      }
      else if(!message.error){
        local.ls.getUser(usr_id).subscribe(data=>{
          var message = JSON.parse(JSON.stringify(data))
          local.ls.setUser(message)
          local.ls.isUserLoggedIn()
          local.goToNavigation()
        })
      }

      local.loginForm.reset()
    })
  }


  }

  goToNavigation(){
    let usr_role_id = this.es.decrypt(localStorage.getItem('usr_role_id'))

    if(usr_role_id){
      switch(usr_role_id){
        case 'SA':
          this.router.navigate(['/super/partner'])
          break;
        case 'PA':
          this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account'])
          break;
        case 'AA':
          this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))])
          break;
        case 'UA':
          this.router.navigate(['/user'])
          break;
      }
    }
  }


}
