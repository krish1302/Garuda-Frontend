import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerAdminRoutingModule } from './partner-admin-routing.module';
import { AccountAdminComponent } from './components/account-admin/account-admin.component';
import { AccountUserComponent } from './components/account-user/account-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AccountAdminComponent,
    AccountUserComponent
  ],
  imports: [
    CommonModule,
    PartnerAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class PartnerAdminModule { }
