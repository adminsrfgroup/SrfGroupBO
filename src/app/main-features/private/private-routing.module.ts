import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateMainComponent } from './private-main/private-main.component';
import {RoleManagmentModule} from "./role-managment/role-managment.module";

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
                path: 'offer',
                loadChildren: () => import('./offer-managment/offer-managment.module').then(m => m.OfferManagementModule),
            },
            {
                path: 'home',
                loadChildren: () => import('./home-managment/home-managment.module').then(m => m.HomeManagmentModule),
            },
            {
                path: 'support',
                loadChildren: () => import('./support-management/support-management.module').then(m => m.SupportManagementModule),
            },
            {
                path: 'address',
                loadChildren: () => import('./address-managment/address-managment.module').then(m => m.AddressManagmentModule),
            },
            {
                path: 'category',
                loadChildren: () => import('./category-managment/category-managment.module').then(m => m.CategoryManagmentModule),
            },
            {
              path: 'role',
              loadChildren: () => import('./role-managment/role-managment.module').then(m => m.RoleManagmentModule),
            }
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
