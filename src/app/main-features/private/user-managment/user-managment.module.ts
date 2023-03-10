import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagmentRoutingModule } from './user-managment-routing.module';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [ListUsersComponent],
    imports: [CommonModule, UserManagmentRoutingModule, SharedModule],
})
export class UserManagmentModule {}
