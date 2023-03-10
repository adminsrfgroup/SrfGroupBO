import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeManagmentRoutingModule } from './home-managment-routing.module';
import { TopSlideComponent } from './pages/top-slide/top-slide.component';
import { AddTopSlideComponent } from './pages/add-top-slide/add-top-slide.component';
import { SharedModule } from '../../../shared/shared.module';
import { ListFeatureSlideComponent } from './pages/list-feature-slide/list-feature-slide.component';
import { AddUpdateFeatureSlideComponent } from './pages/add-update-feature-slide/add-update-feature-slide.component';

@NgModule({
    declarations: [TopSlideComponent, AddTopSlideComponent, ListFeatureSlideComponent, AddUpdateFeatureSlideComponent],
    imports: [CommonModule, HomeManagmentRoutingModule, SharedModule],
})
export class HomeManagmentModule {}
