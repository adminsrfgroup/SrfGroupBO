import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateMainComponent } from './private-main/private-main.component';

const routes: Routes = [
    {
        path: '',
        component: PrivateMainComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
            },
            {
                path: 'user',
                loadChildren: () => import('./user-managment/user-managment.module').then(m => m.UserManagmentModule),
            },
            {
                path: 'home',
                loadChildren: () => import('./home-managment/home-managment.module').then(m => m.HomeManagmentModule),
            },
        ],
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule {}
