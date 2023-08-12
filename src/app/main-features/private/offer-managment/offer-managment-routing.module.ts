import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfferComponent } from './pages/list-offer/list-offer.component';
import {DescriptionAddNewOfferComponent} from "./pages/list-description-add-new-offer/description-add-new-offer.component";
import {
  AddUpdateDescriptionAddNewOfferComponent
} from "./pages/add-update-description-add-new-offer/add-update-description-add-new-offer.component";

const routes: Routes = [
    {
        path: 'list',
        component: ListOfferComponent,
    },
    {
      path: 'description-add-new-offer',
      component: DescriptionAddNewOfferComponent,
    },
    {
      path: 'add-update-description-add-new-offer',
      component: AddUpdateDescriptionAddNewOfferComponent,
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
