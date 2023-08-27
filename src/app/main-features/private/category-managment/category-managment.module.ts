import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryManagmentRoutingModule } from './category-managment-routing.module';
import { ListCategoryComponent } from './pages/list-category/list-category.component';
import { SharedModule } from '../../../shared/shared.module';
import { AddUpdateCategoryComponent } from './pages/add-update-category/add-update-category.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ListCategoryComponent, AddUpdateCategoryComponent],
    imports: [CommonModule, CategoryManagmentRoutingModule, SharedModule, ReactiveFormsModule],
})
export class CategoryManagmentModule {}
