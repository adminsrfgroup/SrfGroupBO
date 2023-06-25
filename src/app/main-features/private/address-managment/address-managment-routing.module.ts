import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAddressComponent } from './pages/list-address/list-address.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListAddressComponent,
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddressManagmentRoutingModule {}
