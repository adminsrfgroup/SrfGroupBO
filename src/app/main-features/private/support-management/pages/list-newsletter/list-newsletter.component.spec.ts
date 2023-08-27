import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewsletterComponent } from './list-newsletter.component';
import {provideMockStore} from "@ngrx/store/testing";
import {initSupportState} from "../../store/state/support.state";
import {SharedModule} from "../../../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ListNewsletterComponent', () => {
    let component: ListNewsletterComponent;
    let fixture: ComponentFixture<ListNewsletterComponent>;
    const initialState = {...initSupportState}

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListNewsletterComponent],
          providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListNewsletterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
