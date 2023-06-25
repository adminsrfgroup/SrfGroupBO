import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './pages/list-category/list-category.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListCategoryComponent,
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
