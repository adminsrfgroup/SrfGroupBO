import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogsComponent } from './pages/logs/logs.component';
import { OrganigrammeComponent } from './pages/organigramme/organigramme.component';

@NgModule({
    declarations: [DashboardComponent, LogsComponent, OrganigrammeComponent],
    imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
