import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressManagmentRoutingModule } from './address-managment-routing.module';
import { ListAddressComponent } from './pages/list-address/list-address.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [ListAddressComponent],
    imports: [CommonModule, AddressManagmentRoutingModule, SharedModule],
})
export class AddressManagmentModule {}
