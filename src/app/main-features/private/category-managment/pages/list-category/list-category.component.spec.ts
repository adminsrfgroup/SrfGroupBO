import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryComponent } from './list-category.component';
import {provideMockStore} from "@ngrx/store/testing";
import {initCategoryState} from "../../store/state/init.state";
import {SharedModule} from "../../../../../shared/shared.module";

describe('ListCategoryComponent', () => {
    let component: ListCategoryComponent;
    let fixture: ComponentFixture<ListCategoryComponent>;

    const initialState = initCategoryState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListCategoryComponent],
            imports: [SharedModule],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
