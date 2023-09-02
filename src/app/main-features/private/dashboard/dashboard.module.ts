import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LogsComponent } from './pages/logs/logs.component';
import { OrganigrammeComponent } from './pages/organigramme/organigramme.component';
import { SharedModule } from '../../../shared/shared.module';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MetricsComponent } from './pages/metrics/metrics.component';

@NgModule({
    declarations: [LogsComponent, OrganigrammeComponent, MetricsComponent],
    imports: [CommonModule, DashboardRoutingModule, SharedModule, OrganizationChartModule],
})
export class DashboardModule {}
