import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagmentRoutingModule } from './role-managment-routing.module';
import { ListRoleComponent } from './pages/list-role/list-role.component';
import { AddUpdateRoleComponent } from './pages/add-update-role/add-update-role.component';
import { ListPermissionComponent } from './pages/list-permission/list-permission.component';
import { AddUpdatePermissionComponent } from './pages/add-update-permission/add-update-permission.component';
import {SharedModule} from "../../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListRoleComponent,
    AddUpdateRoleComponent,
    ListPermissionComponent,
    AddUpdatePermissionComponent
  ],
  imports: [
    CommonModule,
    RoleManagmentRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RoleManagmentModule { }
