import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountAdminComponent } from './components/account-admin/account-admin.component';
import { AccountUserComponent } from './components/account-user/account-user.component';
import { AlertComponent } from './components/alert/alert.component';

const routes: Routes = [
  {path:'',
   children:[
    {path:'',component:AccountAdminComponent},
    {path:'user/:acc_id',component:AccountUserComponent},
    {path:'alert',component: AlertComponent}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerAdminRoutingModule { }
