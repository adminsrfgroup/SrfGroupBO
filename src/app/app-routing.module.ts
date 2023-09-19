import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivatePrivate } from './config/guards/auth-guard.service';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./main-features/login/login.module').then(m => m.LoginModule),
        // canDeactivate: [AuthGuardService]
    },
    {
        path: 'private',
        loadChildren: () => import('./main-features/private/private.module').then(m => m.PrivateModule),
        canActivate: [canActivatePrivate],
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    // {
    //     path: '**',
    //     component: PageNotFoundComponent
    // }
];

@NgModule({
    // imports: [RouterModule.forRoot(routes, { useHash: true })],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
