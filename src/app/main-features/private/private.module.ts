import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateMainComponent } from './private-main/private-main.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [PrivateMainComponent],
    imports: [CommonModule, PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}
