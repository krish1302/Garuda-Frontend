import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EncapService } from './service/encap/encap.service';
import { LoginService } from './service/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend'
  log = false


  name !:any
  email !:any
  mobile !:any

  constructor(private ls: LoginService, 
    private router: Router,
    private es: EncapService,
    private snackBar: MatSnackBar){
    if(localStorage.getItem('usr_id')){
      this.log = true
    }

    this.name = this.es.decrypt(localStorage.getItem('usr_name'))
    this.email = this.es.decrypt(localStorage.getItem('usr_email'))
    this.mobile = this.es.decrypt(localStorage.getItem('usr_mobile'))

  }

  ngOnInit():void{
   this.ls.eventEmitter.subscribe(data=>{
    if(localStorage.getItem('usr_id')){
      this.log = true
      this.name = this.es.decrypt(localStorage.getItem('usr_name'))
      this.email = this.es.decrypt(localStorage.getItem('usr_email'))
      this.mobile = this.es.decrypt(localStorage.getItem('usr_mobile'))
    }
   })

   this.name = this.es.decrypt(localStorage.getItem('usr_name'))
   this.email = this.es.decrypt(localStorage.getItem('usr_email'))
   this.mobile = this.es.decrypt(localStorage.getItem('usr_mobile'))
   
  }
  
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
    this.log = false
    var message ='thank you for using Garuda Ver 2.0'
    this.snackBar.open(message,'okay',{
      duration: 5000
    })
  }


  super(){
    return this.es.decrypt(localStorage.getItem('usr_role_id')) == 'SA'
  }

  partner(){
    return this.es.decrypt(localStorage.getItem('usr_role_id')) == 'PA'
  }

  account(){
    return this.es.decrypt(localStorage.getItem('usr_role_id')) == 'AA'
  }



}
