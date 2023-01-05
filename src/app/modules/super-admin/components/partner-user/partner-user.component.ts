import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EncapService } from 'src/app/service/encap/encap.service';
import { PartnerUserService } from 'src/app/service/partner-user/partner-user.service';
import { PartnerService } from 'src/app/service/partner/partner.service';
@Component({
  selector: 'app-partner-user',
  templateUrl: './partner-user.component.html',
  styleUrls: ['./partner-user.component.css']
})
export class PartnerUserComponent implements OnInit {
  create = true
  partnerUsers !:any
  partnerAdmin !:any
  constructor(private fb:FormBuilder, 
              private pus: PartnerUserService, 
              private snackBar:MatSnackBar, 
              private router: ActivatedRoute, 
              private route: Router, 
              private ps: PartnerService,
              private es: EncapService) { 
    
    if(this.es.decrypt(localStorage.getItem('usr_role_id')) != 'SA'){
      localStorage.clear()
      this.route.navigate(['/login']);
    }



    this.pus.getPartnerUsers(this.router.snapshot.paramMap.get('id')).subscribe(data=>{
      this.partnerUsers = data
    })

    this.ps.getPartner(this.router.snapshot.paramMap.get('id')).subscribe(data=>{
      this.partnerAdmin = data
    })

  }

  ngOnInit(): void {
    this.pus.getPartnerUsers(this.router.snapshot.paramMap.get('id')).subscribe(data=>{
      this.partnerUsers = data
    })
    
    this.ps.getPartner(this.router.snapshot.paramMap.get('id')).subscribe(data=>{
      this.partnerAdmin = data
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

  ptrUserForm = this.fb.group({
   usr_id:[''],
   usr_name:[''],
   usr_password:[''],
   usr_mobile:[''],
   usr_email:[''],
   usr_designation:['']
  })



  openCreate(){
    this.create = true
    this.ptrUserForm.reset()
  }

  partner(){
    var usr_id = this.ptrUserForm.get('usr_id')?.value
    var usr_name = this.ptrUserForm.get('usr_name')?.value
    var usr_password = this.ptrUserForm.get('usr_password')?.value
    var usr_mobile = this.ptrUserForm.get('usr_mobile')?.value
    var usr_email = this.ptrUserForm.get('usr_email')?.value
    var usr_designation = this.ptrUserForm.get('usr_designation')?.value

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
      check = true
    }

    return check
  }

  createPartnerUser(){
    var local = this
    if(this.partner()){
      var partnerDetails = {
        usr_id : this.ptrUserForm.get('usr_id')?.value,
        usr_name : this.ptrUserForm.get('usr_name')?.value,
        usr_password : this.ptrUserForm.get('usr_password')?.value,
        usr_mobile : this.ptrUserForm.get('usr_mobile')?.value,
        usr_email : this.ptrUserForm.get('usr_email')?.value,
        usr_designation : this.ptrUserForm.get('usr_designation')?.value,
        usr_ptr_id:this.router.snapshot.paramMap.get('id'),
        usr_role_id:'PA',
        usr_is_active:1,
        usr_start_date:moment().format("DD-MM-YYYY"),
        usr_start_time:moment().format("HH:mm a")
      }
      //console.log(partnerDetails)
      document.getElementById('close')?.click()
      this.pus.createPartnerUser(partnerDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        local.pus.getPartnerUsers(this.router.snapshot.paramMap.get('id')).subscribe(data=>{
          local.partnerUsers = data
        })
      })

    }
  }

  updatePartnerUser(){
    var local = this
    if(this.partner()){
      var partnerDetails = {
        usr_id : this.ptrUserForm.get('usr_id')?.value,
        usr_name : this.ptrUserForm.get('usr_name')?.value,
        usr_password : this.ptrUserForm.get('usr_password')?.value,
        usr_mobile : this.ptrUserForm.get('usr_mobile')?.value,
        usr_email : this.ptrUserForm.get('usr_email')?.value,
        usr_designation : this.ptrUserForm.get('usr_designation')?.value,
        usr_role_id:'PA'
      }
      document.getElementById('close')?.click()
      this.pus.updatePartnerUser(partnerDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        local.pus.getPartnerUsers(this.router.snapshot.paramMap.get('id')).subscribe(data=>{
          local.partnerUsers = data
        })

        local.ptrUserForm.reset()
      })
    }
  }

  update(id:any){
    var local = this
    this.pus.getPartnerUser(id).subscribe(data=>{
      var partner = JSON.parse(JSON.stringify(data))
      local.ptrUserForm.setValue({
        usr_id:partner[0].USR_ID,
        usr_name:partner[0].USR_NAME,
        usr_password:partner[0].USR_PASSWORD,
        usr_mobile:partner[0].USR_MOBILE,
        usr_email:partner[0].USR_EMAIL,
        usr_designation:partner[0].USR_DESIGNATION,
      })
      local.create = false
    })
  }

  delete(id:any){
    var local = this
    var partner = {
      usr_id: id,
      usr_stop_date:moment().format("DD-MM-YYYY"),
      usr_stop_time:moment().format("HH:mm a")
    }

    this.pus.deletePartnerUser(partner).subscribe(data=>{
      var message = JSON.parse(JSON.stringify(data))
      local.snackBar.open(message.text,'okay',{
        duration: 5000
      })
      local.pus.getPartnerUsers(this.router.snapshot.paramMap.get('id')).subscribe(data=>{
        local.partnerUsers = data
      })
    })
  }
}
