import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AccountService } from 'src/app/service/account/account.service';
import { EncapService } from 'src/app/service/encap/encap.service';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css']
})
export class AccountAdminComponent implements OnInit {

  create = true
  accounts !:any
  constructor(private fb:FormBuilder, 
    private as: AccountService, 
    private snackBar:MatSnackBar, 
    private router: Router, 
    private activeRoute: ActivatedRoute,
    private es: EncapService) { 
    if(this.es.decrypt(localStorage.getItem('usr_role_id')) == 'PA' && localStorage.getItem('usr_ptr_id') && !localStorage.getItem('usr_acc_id')){
      if(this.es.decrypt(localStorage.getItem('usr_ptr_id')) != this.activeRoute.snapshot.paramMap.get('id')){
        this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account'])
      }
    }
    else{
      this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/'+this.es.decrypt(localStorage.getItem('usr_acc_id'))])
    }
    
    this.as.getAccounts(this.activeRoute.snapshot.paramMap.get('id')).subscribe(data=>{
      this.accounts = data
    })
  }

  ngOnInit(): void {
    this.as.getAccounts(this.activeRoute.snapshot.paramMap.get('id')).subscribe(data=>{
      this.accounts = data
    })
  }

  hint = {
    acc_name:'',
    acc_address:'',
    acc_pan:'',
    acc_gst:'',
    acc_cin:'',
    acc_contact_name:'',
    acc_contact_no:'',
    acc_contact_email:''
  }

  accForm = this.fb.group({
    acc_id:[''],
    acc_name:[''],
    acc_address:[''],
    acc_pan:[''],
    acc_gst:[''],
    acc_cin:[''],
    acc_contact_name:[''],
    acc_contact_no:[''],
    acc_contact_email:['']
  })

  goToAccountUser(id:any){
    this.router.navigate(['/partner/'+this.es.decrypt(localStorage.getItem('usr_ptr_id'))+'/account/user/'+id])
  }

  openCreate(){
    this.create = true
    this.accForm.reset()
  }

  account(){
    var acc_name = this.accForm.get('acc_name')?.value
    var acc_address = this.accForm.get('acc_address')?.value
    var acc_pan = this.accForm.get('acc_pan')?.value
    var acc_gst = this.accForm.get('acc_gst')?.value
    var acc_cin = this.accForm.get('acc_cin')?.value
    var acc_contact_name = this.accForm.get('acc_contact_name')?.value
    var acc_contact_no = this.accForm.get('acc_contact_no')?.value
    var acc_contact_email = this.accForm.get('acc_contact_email')?.value

    var check = false

    this.hint = {
      acc_name:'',
      acc_address:'',
      acc_pan:'',
      acc_gst:'',
      acc_cin:'',
      acc_contact_name:'',
      acc_contact_no:'',
      acc_contact_email:''
    }

    if(!acc_name){
      this.hint.acc_name = 'Account name is required'
    }
    else if(!acc_address){
      this.hint.acc_address = 'Account address is required'
    }
    else if(!acc_pan){
      this.hint.acc_pan = 'Account pancard no is required'
    }
    else if(!acc_gst){
      this.hint.acc_gst = 'Account gst no is required'
    }
    else if(!acc_cin){
      this.hint.acc_cin = 'Account cin no is required'
    }
    else if(!acc_contact_name){
      this.hint.acc_contact_name = 'Account contact name is required'
    }
    else if(!acc_contact_no){
      this.hint.acc_contact_no = 'Account contact no is required'
    }
    else if(!acc_contact_email){
      this.hint.acc_contact_email = 'Account contact email is required'
    }
    else{
      document.getElementById('can')?.click()
      check = true
    }

    return check
  }

  createAccount(){
    var local = this
    if(this.account()){

      var accountDetails = {
        acc_name : this.accForm.get('acc_name')?.value,
        acc_ptr_id: this.activeRoute.snapshot.paramMap.get('id'),
        acc_address : this.accForm.get('acc_address')?.value,
        acc_pan : this.accForm.get('acc_pan')?.value,
        acc_gst : this.accForm.get('acc_gst')?.value,
        acc_cin : this.accForm.get('acc_cin')?.value,
        acc_contact_name : this.accForm.get('acc_contact_name')?.value,
        acc_contact_no : this.accForm.get('acc_contact_no')?.value,
        acc_contact_email : this.accForm.get('acc_contact_email')?.value,
        acc_start_date:moment().format("DD-MM-YYYY"),
        acc_start_time:moment().format("HH:mm a")
      }
      // console.log(accountDetails)
      document.getElementById('close')?.click()
      this.as.createAccount(accountDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        local.as.getAccounts(this.activeRoute.snapshot.paramMap.get('id')).subscribe(data=>{
          local.accounts = data
        })
        document.getElementById('cancel')?.click()
      })

    }
  }

  updateAccount(){
    var local = this
    if(this.account()){
      var accountDetails = {
        acc_id : this.accForm.get('acc_id')?.value,
        acc_name : this.accForm.get('acc_name')?.value,
        acc_address : this.accForm.get('acc_address')?.value,
        acc_pan : this.accForm.get('acc_pan')?.value,
        acc_gst : this.accForm.get('acc_gst')?.value,
        acc_cin : this.accForm.get('acc_cin')?.value,
        acc_contact_name : this.accForm.get('acc_contact_name')?.value,
        acc_contact_no : this.accForm.get('acc_contact_no')?.value,
        acc_contact_email : this.accForm.get('acc_contact_email')?.value,
      }
      document.getElementById('close')?.click()
      this.as.updateAccount(accountDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        local.as.getAccounts(this.activeRoute.snapshot.paramMap.get('id')).subscribe(data=>{
          local.accounts = data
        })

        local.accForm.reset()
      })
    }
  }

  update(id:any){
    var local = this
    this.as.getAccount(this.activeRoute.snapshot.paramMap.get('id'),id).subscribe(data=>{
      var account = JSON.parse(JSON.stringify(data))
      console.log(account)
      local.accForm.setValue({
        acc_id:account[0].ACC_ID,
        acc_name:account[0].ACC_NAME,
        acc_address:account[0].ACC_ADDRESS,
        acc_pan:account[0].ACC_PAN,
        acc_gst:account[0].ACC_GST,
        acc_cin:account[0].ACC_CIN,
        acc_contact_name:account[0].ACC_CONTACT_NAME,
        acc_contact_no:account[0].ACC_CONTACT_NO,
        acc_contact_email:account[0].ACC_CONTACT_EMAIL
      })
      local.create = false
    })
  }

  delete(id:any){
    var local = this

    var account = {
      acc_id: id,
      acc_stop_date:moment().format("DD-MM-YYYY"),
      acc_stop_time:moment().format("HH:mm a")
    }

    this.as.deleteAccount(account).subscribe(data=>{
      var message = JSON.parse(JSON.stringify(data))
      local.snackBar.open(message.text,'okay',{
        duration: 5000
      })
      local.as.getAccounts(this.activeRoute.snapshot.paramMap.get('id')).subscribe(data=>{
        local.accounts = data
      })
    })
  }
}
