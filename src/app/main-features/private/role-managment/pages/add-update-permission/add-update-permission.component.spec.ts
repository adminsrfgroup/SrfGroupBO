import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePermissionComponent } from './add-update-permission.component';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddUpdatePermissionComponent', () => {
    let component: AddUpdatePermissionComponent;
    let fixture: ComponentFixture<AddUpdatePermissionComponent>;

    const initialState = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
            declarations: [AddUpdatePermissionComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(AddUpdatePermissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
