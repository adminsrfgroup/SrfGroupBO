import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './pages/list-role/list-role.component';
import { ListPermissionComponent } from './pages/list-permission/list-permission.component';
import { AddUpdateRoleComponent } from './pages/add-update-role/add-update-role.component';
import { AddUpdatePermissionComponent } from './pages/add-update-permission/add-update-permission.component';

const routes: Routes = [
    {
        path: 'list-role',
        component: ListRoleComponent,
    },
    {
        path: 'add-update-role',
        component: AddUpdateRoleComponent,
    },
    {
        path: 'add-update-role/:id',
        component: AddUpdateRoleComponent,
    },
    {
        path: 'list-permissions',
        component: ListPermissionComponent,
    },
    {
        path: 'add-update-permissions',
        component: AddUpdatePermissionComponent,
    },
    {
        path: 'add-update-permissions/:id',
        component: AddUpdatePermissionComponent,
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoleManagmentRoutingModule {}
