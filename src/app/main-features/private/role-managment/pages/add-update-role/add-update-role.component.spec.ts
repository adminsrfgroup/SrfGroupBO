import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateRoleComponent } from './add-update-role.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';

describe('AddUpdateRoleComponent', () => {
    let component: AddUpdateRoleComponent;
    let fixture: ComponentFixture<AddUpdateRoleComponent>;
    const initialState = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
            declarations: [AddUpdateRoleComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(AddUpdateRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
