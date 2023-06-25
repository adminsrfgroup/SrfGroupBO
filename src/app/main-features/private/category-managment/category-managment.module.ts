import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManagmentRoutingModule } from './category-managment-routing.module';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
    declarations: [ListCategoryComponent],
    imports: [CommonModule, CategoryManagmentRoutingModule, SharedModule],
})
export class CategoryManagmentModule {}
