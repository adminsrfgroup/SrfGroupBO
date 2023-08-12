import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddressComponent } from './list-address.component';
import {initAddressState} from "../../store/state/init.state";
import {provideMockStore} from "@ngrx/store/testing";
import {SharedModule} from "../../../../../shared/shared.module";

describe('ListAddressComponent', () => {
    let component: ListAddressComponent;
    let fixture: ComponentFixture<ListAddressComponent>;

    const initialState = initAddressState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListAddressComponent],
            imports: [SharedModule],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
