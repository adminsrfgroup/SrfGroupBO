import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAboutUsComponent } from './add-update-about-us.component';
import { initSupportState } from '../../store/state/support.state';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddUpdateAboutUsComponent', () => {
    let component: AddUpdateAboutUsComponent;
    let fixture: ComponentFixture<AddUpdateAboutUsComponent>;
    const initialState = { ...initSupportState };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
            declarations: [AddUpdateAboutUsComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(AddUpdateAboutUsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
