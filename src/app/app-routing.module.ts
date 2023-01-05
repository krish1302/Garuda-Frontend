import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AccountGuard } from './guard/account/account.guard';
import { PartnerGuard } from './guard/partner/partner.guard';
import { SuperGuard } from './guard/super/super.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {
    path:'super/partner',
    canActivate:[SuperGuard],
    loadChildren: () => 
      import('./modules/super-admin/super-admin.module').then( m => m.SuperAdminModule )
  },
  {
    path:'partner/:id/account',
    canActivate:[PartnerGuard],
    loadChildren: ()=>
      import('./modules/partner-admin/partner-admin.module').then( m => m.PartnerAdminModule )
  },
  {
    path:'partner/:id/account/:acc_id',
    canActivate:[AccountGuard],
    loadChildren: ()=>
      import('./modules/account-admin/account-admin.module').then( m => m.AccountAdminModule )
  },
  {
    path:'user',
    loadChildren: ()=>
      import('./modules/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
