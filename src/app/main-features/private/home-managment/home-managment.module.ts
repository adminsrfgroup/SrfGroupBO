import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeManagmentRoutingModule } from './home-managment-routing.module';
import { TopSlideComponent } from './pages/top-slide/top-slide.component';
import { AddTopSlideComponent } from './pages/add-top-slide/add-top-slide.component';
import {SharedModule} from "../../../shared/shared.module";


@NgModule({
  declarations: [
    TopSlideComponent,
    AddTopSlideComponent
  ],
  imports: [
    CommonModule,
    HomeManagmentRoutingModule,
    SharedModule
  ]
})
export class HomeManagmentModule { }
