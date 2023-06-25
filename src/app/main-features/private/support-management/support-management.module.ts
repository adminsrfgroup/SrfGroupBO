import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportManagementRoutingModule } from './support-management-routing.module';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

@NgModule({
    declarations: [ContactUsComponent],
    imports: [CommonModule, SupportManagementRoutingModule],
})
export class SupportManagementModule {}
