import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateDescriptionAddNewOfferComponent } from './add-update-description-add-new-offer.component';

describe('AddUpdateDescriptionAddNewOfferComponent', () => {
    let component: AddUpdateDescriptionAddNewOfferComponent;
    let fixture: ComponentFixture<AddUpdateDescriptionAddNewOfferComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddUpdateDescriptionAddNewOfferComponent],
        });
        fixture = TestBed.createComponent(AddUpdateDescriptionAddNewOfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
