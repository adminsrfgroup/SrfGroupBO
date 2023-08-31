import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeclarationComponent } from './list-declaration.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initSupportState } from '../../store/state/support.state';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListDeclarationComponent', () => {
    let component: ListDeclarationComponent;
    let fixture: ComponentFixture<ListDeclarationComponent>;
    const initialState = { ...initSupportState };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListDeclarationComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListDeclarationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
