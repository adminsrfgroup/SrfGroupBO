import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfferComponent } from './pages/list-offer/list-offer.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListOfferComponent,
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
export class OfferManagementRoutingModule {}
