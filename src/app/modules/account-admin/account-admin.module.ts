import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountAdminRoutingModule } from './account-admin-routing.module';
import { UsersComponent } from './components/users/users.component';
import { CamerasComponent } from './components/cameras/cameras.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    UsersComponent,
    CamerasComponent
  ],
  imports: [
    CommonModule,
    AccountAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class AccountAdminModule { }
