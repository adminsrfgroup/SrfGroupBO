import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './pages/logs/logs.component';
import { OrganigrammeComponent } from './pages/organigramme/organigramme.component';
import { MetricsComponent } from './pages/metrics/metrics.component';

const routes: Routes = [
    {
        path: 'metrics',
        component: MetricsComponent,
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
        redirectTo: 'metrics',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
