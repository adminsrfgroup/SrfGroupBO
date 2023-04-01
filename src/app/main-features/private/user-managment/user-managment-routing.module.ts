import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import {DetailsUserComponent} from "./pages/details-user/details-user.component";

const routes: Routes = [
    {
        path: 'list',
        component: ListUsersComponent,
    },
    {
      path: 'details-users/:id',
      component: DetailsUserComponent,
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
export class UserManagmentRoutingModule {}
