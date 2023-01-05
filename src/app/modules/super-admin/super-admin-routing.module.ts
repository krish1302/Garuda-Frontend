import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerAdminComponent } from './components/partner-admin/partner-admin.component';
import { PartnerUserComponent } from './components/partner-user/partner-user.component';

const routes: Routes = [
  {path:'',
    children:[
      {path:'',component:PartnerAdminComponent},
      {path:'user/:id',component:PartnerUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
