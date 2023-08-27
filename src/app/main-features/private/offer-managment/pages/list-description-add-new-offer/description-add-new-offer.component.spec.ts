import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionAddNewOfferComponent } from './description-add-new-offer.component';
import {provideMockStore} from "@ngrx/store/testing";
import {initOfferState} from "../../store/state/offer.state";
import {SharedModule} from "../../../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DescriptionAddNewOfferComponent', () => {
    let component: DescriptionAddNewOfferComponent;
    let fixture: ComponentFixture<DescriptionAddNewOfferComponent>;

    const initialState = {...initOfferState}

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [DescriptionAddNewOfferComponent],
          providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(DescriptionAddNewOfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
