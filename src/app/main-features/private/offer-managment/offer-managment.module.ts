import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferManagementRoutingModule } from './offer-managment-routing.module';
import { ListOfferComponent } from './pages/list-offer/list-offer.component';
import { SharedModule } from '../../../shared/shared.module';
import { DescriptionAddNewOfferComponent } from './pages/list-description-add-new-offer/description-add-new-offer.component';
import { AddUpdateDescriptionAddNewOfferComponent } from './pages/add-update-description-add-new-offer/add-update-description-add-new-offer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ListOfferComponent, DescriptionAddNewOfferComponent, AddUpdateDescriptionAddNewOfferComponent],
    imports: [CommonModule, OfferManagementRoutingModule, SharedModule, FormsModule],
})
export class OfferManagementModule {}
