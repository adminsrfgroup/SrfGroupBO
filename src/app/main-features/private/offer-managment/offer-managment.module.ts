import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferManagementRoutingModule } from './offer-managment-routing.module';
import { ListOfferComponent } from './pages/list-offer/list-offer.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [ListOfferComponent],
    imports: [CommonModule, OfferManagementRoutingModule, SharedModule],
})
export class OfferManagementModule {}
