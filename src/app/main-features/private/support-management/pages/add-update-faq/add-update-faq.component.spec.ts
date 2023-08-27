import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFaqComponent } from './add-update-faq.component';
import {initSupportState} from "../../store/state/support.state";
import {provideMockStore} from "@ngrx/store/testing";
import {SharedModule} from "../../../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('AddUpdateFaqComponent', () => {
    let component: AddUpdateFaqComponent;
    let fixture: ComponentFixture<AddUpdateFaqComponent>;
  const initialState = {...initSupportState}

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
            declarations: [AddUpdateFaqComponent],
          providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(AddUpdateFaqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
