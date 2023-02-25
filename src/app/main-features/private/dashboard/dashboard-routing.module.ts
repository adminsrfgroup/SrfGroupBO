import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogsComponent } from './pages/logs/logs.component';
import { OrganigrammeComponent } from './pages/organigramme/organigramme.component';

const routes: Routes = [
    {
        path: 'home',
        component: DashboardComponent,
    },
    {
        path: 'logs',
        component: LogsComponent,
    },
    {
        path: 'organigramme',
        component: OrganigrammeComponent,
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
