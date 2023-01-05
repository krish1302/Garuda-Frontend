import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { PartnerService } from 'src/app/service/partner/partner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner-admin',
  templateUrl: './partner-admin.component.html',
  styleUrls: ['./partner-admin.component.css']
})
export class PartnerAdminComponent implements OnInit {
  create = true
  partners !:any
  constructor(private fb:FormBuilder, 
    private ps: PartnerService, 
    private snackBar:MatSnackBar, 
    private router: Router) { 

    this.ps.getPartners().subscribe(data=>{
      this.partners = data
    })

  }

  ngOnInit(): void {
    this.ps.getPartners().subscribe(data=>{
      this.partners = data
    })
  }

  hint = {
    ptr_name:'',
    ptr_address:'',
    ptr_pan_no:'',
    ptr_gst:'',
    ptr_cin:'',
    ptr_contact_name:'',
    ptr_contact_no:'',
    ptr_contact_email:''
  }

  ptrForm = this.fb.group({
    ptr_id:[''],
    ptr_name:[''],
    ptr_address:[''],
    ptr_pan_no:[''],
    ptr_gst:[''],
    ptr_cin:[''],
    ptr_contact_name:[''],
    ptr_contact_no:[''],
    ptr_contact_email:['']
  })

  goToPartnerUser(id:any){
    this.router.navigate(['/super/partner/user/'+id])
  }

  openCreate(){
    this.create = true
    this.ptrForm.reset()
  }

  partner(){
    var ptr_name = this.ptrForm.get('ptr_name')?.value
    var ptr_address = this.ptrForm.get('ptr_address')?.value
    var ptr_pan_no = this.ptrForm.get('ptr_pan_no')?.value
    var ptr_gst = this.ptrForm.get('ptr_gst')?.value
    var ptr_cin = this.ptrForm.get('ptr_cin')?.value
    var ptr_contact_name = this.ptrForm.get('ptr_contact_name')?.value
    var ptr_contact_no = this.ptrForm.get('ptr_contact_no')?.value
    var ptr_contact_email = this.ptrForm.get('ptr_contact_email')?.value

    var check = false

    this.hint = {
      ptr_name:'',
      ptr_address:'',
      ptr_pan_no:'',
      ptr_gst:'',
      ptr_cin:'',
      ptr_contact_name:'',
      ptr_contact_no:'',
      ptr_contact_email:''
    }

    if(!ptr_name){
      this.hint.ptr_name = 'partner name is required'
    }
    else if(!ptr_address){
      this.hint.ptr_address = 'partner address is required'
    }
    else if(!ptr_pan_no){
      this.hint.ptr_pan_no = 'partner pancard no is required'
    }
    else if(!ptr_gst){
      this.hint.ptr_gst = 'partner gst no is required'
    }
    else if(!ptr_cin){
      this.hint.ptr_cin = 'partner cin no is required'
    }
    else if(!ptr_contact_name){
      this.hint.ptr_contact_name = 'partner contact name is required'
    }
    else if(!ptr_contact_no){
      this.hint.ptr_contact_no = 'partner contact no is required'
    }
    else if(!ptr_contact_email){
      this.hint.ptr_contact_email = 'partner contact email is required'
    }
    else{
      check = true
    }

    return check
  }

  createPartner(){
    var local = this
    if(this.partner()){
      var partnerDetails = {
        ptr_name : this.ptrForm.get('ptr_name')?.value,
        ptr_address : this.ptrForm.get('ptr_address')?.value,
        ptr_pan_no : this.ptrForm.get('ptr_pan_no')?.value,
        ptr_gst : this.ptrForm.get('ptr_gst')?.value,
        ptr_cin : this.ptrForm.get('ptr_cin')?.value,
        ptr_contact_name : this.ptrForm.get('ptr_contact_name')?.value,
        ptr_contact_no : this.ptrForm.get('ptr_contact_no')?.value,
        ptr_contact_email : this.ptrForm.get('ptr_contact_email')?.value,
        ptr_start_date:moment().format("DD-MM-YYYY"),
        ptr_start_time:moment().format("HH:mm a")
      }
      document.getElementById('close')?.click()

      this.ps.createPartner(partnerDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        local.ps.getPartners().subscribe(data=>{
          local.partners = data
        })
      })

    }
  }

  updatePartner(){
    var local = this
    if(this.partner()){
      var partnerDetails = {
        ptr_id : this.ptrForm.get('ptr_id')?.value,
        ptr_name : this.ptrForm.get('ptr_name')?.value,
        ptr_address : this.ptrForm.get('ptr_address')?.value,
        ptr_pan_no : this.ptrForm.get('ptr_pan_no')?.value,
        ptr_gst : this.ptrForm.get('ptr_gst')?.value,
        ptr_cin : this.ptrForm.get('ptr_cin')?.value,
        ptr_contact_name : this.ptrForm.get('ptr_contact_name')?.value,
        ptr_contact_no : this.ptrForm.get('ptr_contact_no')?.value,
        ptr_contact_email : this.ptrForm.get('ptr_contact_email')?.value,
      }
      document.getElementById('close')?.click()
      this.ps.updatePartner(partnerDetails).subscribe(data=>{
        var message = JSON.parse(JSON.stringify(data))
        local.snackBar.open(message.text,'okay',{
          duration: 5000
        })
        local.ps.getPartners().subscribe(data=>{
          local.partners = data
        })

        local.ptrForm.reset()
      })
    }
  }

  update(id:any){
    var local = this
    this.ps.getPartner(id).subscribe(data=>{
      var partner = JSON.parse(JSON.stringify(data))
      local.ptrForm.setValue({
        ptr_id:partner[0].PTR_ID,
        ptr_name:partner[0].PTR_NAME,
        ptr_address:partner[0].PTR_ADDRESS,
        ptr_pan_no:partner[0].PTR_PAN_NO,
        ptr_gst:partner[0].PTR_GST,
        ptr_cin:partner[0].PTR_CIN,
        ptr_contact_name:partner[0].PTR_CONTACT_NAME,
        ptr_contact_no:partner[0].PTR_CONTACT_NO,
        ptr_contact_email:partner[0].PTR_CONTACT_EMAIL
      })
      local.create = false
    })
  }

  delete(id:any){
    var local = this

    var partner = {
      ptr_id: id,
      ptr_stop_date:moment().format("DD-MM-YYYY"),
      ptr_stop_time:moment().format("HH:mm a")
    }

    this.ps.deletePartner(partner).subscribe(data=>{
      var message = JSON.parse(JSON.stringify(data))
      local.snackBar.open(message.text,'okay',{
        duration: 5000
      })
      local.ps.getPartners().subscribe(data=>{
        local.partners = data
      })
    })
  }

}
