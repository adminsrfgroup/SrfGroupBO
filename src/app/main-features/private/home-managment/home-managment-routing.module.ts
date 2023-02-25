import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TopSlideComponent} from "./pages/top-slide/top-slide.component";
import {AddTopSlideComponent} from "./pages/add-top-slide/add-top-slide.component";

const routes: Routes = [
  {
    path: 'top-slides',
    component: TopSlideComponent
  },
  {
    path: 'add-top-slides',
    component: AddTopSlideComponent
  },
  {
    path: 'edit-add-top-slides/:id',
    component: AddTopSlideComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeManagmentRoutingModule { }
