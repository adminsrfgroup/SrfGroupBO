import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFaqComponent } from './list-faq.component';
import {initSupportState} from "../../store/state/support.state";
import {provideMockStore} from "@ngrx/store/testing";
import {SharedModule} from "../../../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ListFaqComponent', () => {
    let component: ListFaqComponent;
    let fixture: ComponentFixture<ListFaqComponent>;
  const initialState = {...initSupportState}

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListFaqComponent],
          providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListFaqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
