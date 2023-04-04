import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactUsComponent} from "./pages/contact-us/contact-us.component";

const routes: Routes = [
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: '',
    redirectTo: 'contact-us',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportManagementRoutingModule { }
