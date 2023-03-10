import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopSlideComponent } from './pages/top-slide/top-slide.component';
import { AddTopSlideComponent } from './pages/add-top-slide/add-top-slide.component';
import { ListFeatureSlideComponent } from './pages/list-feature-slide/list-feature-slide.component';
import { AddUpdateFeatureSlideComponent } from './pages/add-update-feature-slide/add-update-feature-slide.component';

const routes: Routes = [
    {
        path: 'top-slides',
        component: TopSlideComponent,
    },
    {
        path: 'add-top-slides',
        component: AddTopSlideComponent,
    },
    {
        path: 'edit-add-top-slides/:id',
        component: AddTopSlideComponent,
    },
    {
        path: 'list-feature-slide',
        component: ListFeatureSlideComponent,
    },
    {
        path: 'add-feature-slide',
        component: AddUpdateFeatureSlideComponent,
    },
    {
        path: 'update-feature-slide/:id',
        component: AddUpdateFeatureSlideComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeManagmentRoutingModule {}
