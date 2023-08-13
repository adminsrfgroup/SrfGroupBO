import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportManagementRoutingModule } from './support-management-routing.module';
import { AddUpdateAboutUsComponent } from './pages/add-update-about-us/add-update-about-us.component';
import { ListAboutUsComponent } from './pages/list-about-us/list-about-us.component';
import { ListDeclarationComponent } from './pages/list-declaration/list-declaration.component';
import { ListCguComponent } from './pages/list-cgu/list-cgu.component';
import { ListNewsletterComponent } from './pages/list-newsletter/list-newsletter.component';
import { ListContactUsComponent } from './pages/list-contact-us/list-contact-us.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    declarations: [AddUpdateAboutUsComponent, ListAboutUsComponent, ListDeclarationComponent, ListCguComponent, ListNewsletterComponent, ListContactUsComponent],
    imports: [CommonModule, SupportManagementRoutingModule, ReactiveFormsModule, SharedModule],
})
export class SupportManagementModule {}
