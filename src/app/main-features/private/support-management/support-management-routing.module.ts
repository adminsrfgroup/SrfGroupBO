import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContactUsComponent } from './pages/list-contact-us/list-contact-us.component';
import { ListAboutUsComponent } from './pages/list-about-us/list-about-us.component';
import { ListNewsletterComponent } from './pages/list-newsletter/list-newsletter.component';
import { ListDeclarationComponent } from './pages/list-declaration/list-declaration.component';
import { ListCguComponent } from './pages/list-cgu/list-cgu.component';
import { AddUpdateAboutUsComponent } from './pages/add-update-about-us/add-update-about-us.component';
import { ListFaqComponent } from './pages/list-faq/list-faq.component';
import { AddUpdateFaqComponent } from './pages/add-update-faq/add-update-faq.component';
import {AddUpdateCguComponent} from "./pages/add-update-cgu/add-update-cgu.component";

const routes: Routes = [
    {
        path: 'list-contact-us',
        component: ListContactUsComponent,
    },
    {
        path: 'list-about-us',
        component: ListAboutUsComponent,
    },
    {
        path: 'add-update-about-us',
        component: AddUpdateAboutUsComponent,
    },
    {
        path: 'add-update-about-us/:id',
        component: AddUpdateAboutUsComponent,
    },
    {
        path: 'list-newsletter',
        component: ListNewsletterComponent,
    },
    {
        path: 'list-declaration',
        component: ListDeclarationComponent,
    },
    {
        path: 'list-cgu',
        component: ListCguComponent,
    },
    {
      path: 'add-update-cgu',
      component: AddUpdateCguComponent,
    },
    {
      path: 'add-update-cgu/:id',
      component: AddUpdateCguComponent,
    },
    {
        path: 'list-faq',
        component: ListFaqComponent,
    },
    {
        path: 'add-update-faq',
        component: AddUpdateFaqComponent,
    },
    {
        path: 'add-update-faq/:id',
        component: AddUpdateFaqComponent,
    },
    {
        path: '',
        redirectTo: 'list-contact-us',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SupportManagementRoutingModule {}
