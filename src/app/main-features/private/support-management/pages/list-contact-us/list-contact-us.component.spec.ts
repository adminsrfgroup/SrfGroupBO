import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactUsComponent } from './list-contact-us.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initSupportState } from '../../store/state/support.state';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListContactUsComponent', () => {
    let component: ListContactUsComponent;
    let fixture: ComponentFixture<ListContactUsComponent>;
    const initialState = { ...initSupportState };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListContactUsComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListContactUsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
