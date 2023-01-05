import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { CamerasComponent } from './components/cameras/cameras.component';
import { UserCameraMapComponent } from './components/user-camera-map/user-camera-map.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path:'',
    children:[
      {path:'',component:UsersComponent},
      {path:'camera',component:CamerasComponent},
      {path:'usermap',component:UserCameraMapComponent},
      {path:'alert',component: AlertComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountAdminRoutingModule { }
