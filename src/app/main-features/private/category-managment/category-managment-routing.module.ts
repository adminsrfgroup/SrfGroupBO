import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { AddUpdateCategoryComponent } from './pages/add-update-category/add-update-category.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListCategoryComponent,
    },
    {
        path: 'add-update-category/:id',
        component: AddUpdateCategoryComponent,
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
export class CategoryManagmentRoutingModule {}
