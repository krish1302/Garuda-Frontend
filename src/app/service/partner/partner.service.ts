import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(private httpClient: HttpClient) { }


  getPartners(){
    return this.httpClient.get('http://localhost:3000/partners/read',{responseType:'json'})
  }

  getPartner(partner_id:any){
    return this.httpClient.get('http://localhost:3000/partner/read/'+partner_id,{responseType:'json'})
  }

  createPartner(partner:any){
    return this.httpClient.post('http://localhost:3000/partner/create',partner,{responseType:'json'})
  }

  updatePartner(partner:any){
    return this.httpClient.put('http://localhost:3000/partner/update',partner,{responseType:'json'})
  }

  deletePartner(partner:any){

    return this.httpClient.put('http://localhost:3000/partner/delete',partner,{responseType:'json'})
  }

}
