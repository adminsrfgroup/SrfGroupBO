import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoleComponent } from './list-role.component';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListRoleComponent', () => {
    let component: ListRoleComponent;
    let fixture: ComponentFixture<ListRoleComponent>;
    const initialState = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListRoleComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
