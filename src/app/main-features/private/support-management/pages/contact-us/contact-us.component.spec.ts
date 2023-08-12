import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';
import {initSupportState} from "../../store/state/support.state";
import {provideMockStore} from "@ngrx/store/testing";
import {SharedModule} from "../../../../../shared/shared.module";

describe('ContactUsComponent', () => {
    let component: ContactUsComponent;
    let fixture: ComponentFixture<ContactUsComponent>;

  const initialState = initSupportState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ContactUsComponent],
            imports: [SharedModule],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactUsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create ', () => {
        expect(component).toBeTruthy();
    });
});
