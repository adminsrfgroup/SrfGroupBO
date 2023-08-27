import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCguComponent } from './list-cgu.component';
import {SharedModule} from "../../../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {initSupportState} from "../../store/state/support.state";

describe('ListCguComponent', () => {
    let component: ListCguComponent;
    let fixture: ComponentFixture<ListCguComponent>;
    const initialState = {...initSupportState}

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListCguComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListCguComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
