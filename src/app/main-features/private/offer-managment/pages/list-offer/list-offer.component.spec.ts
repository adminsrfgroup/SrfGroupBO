import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfferComponent } from './list-offer.component';
import { initOfferState } from '../../store/state/offer.state';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../../../shared/shared.module';

describe('ListOfferComponent', () => {
    let component: ListOfferComponent;
    let fixture: ComponentFixture<ListOfferComponent>;

    const initialState = initOfferState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ListOfferComponent],
            imports: [SharedModule],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(ListOfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
