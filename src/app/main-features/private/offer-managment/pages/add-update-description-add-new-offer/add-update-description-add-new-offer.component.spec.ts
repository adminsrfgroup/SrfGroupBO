import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDescriptionAddNewOfferComponent } from './add-update-description-add-new-offer.component';
import {SharedModule} from "../../../../../shared/shared.module";
import {OrganizationChartModule} from "primeng/organizationchart";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {provideMockStore} from "@ngrx/store/testing";
import {initOfferState} from "../../store/state/offer.state";

describe('AddUpdateDescriptionAddNewOfferComponent', () => {
    let component: AddUpdateDescriptionAddNewOfferComponent;
    let fixture: ComponentFixture<AddUpdateDescriptionAddNewOfferComponent>;

    const initialState = {...initOfferState}

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, OrganizationChartModule, HttpClientTestingModule],
          declarations: [AddUpdateDescriptionAddNewOfferComponent],
          providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(AddUpdateDescriptionAddNewOfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
