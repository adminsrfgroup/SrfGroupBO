import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCategoryComponent } from './add-update-category.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddUpdateCategoryComponent', () => {
    let component: AddUpdateCategoryComponent;
    let fixture: ComponentFixture<AddUpdateCategoryComponent>;
    const initialState = {};
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
            declarations: [AddUpdateCategoryComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(AddUpdateCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
