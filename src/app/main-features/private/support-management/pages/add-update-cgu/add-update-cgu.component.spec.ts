import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCguComponent } from './add-update-cgu.component';
import {provideMockStore} from "@ngrx/store/testing";
import {initSupportState} from "../../store/state/support.state";
import {SharedModule} from "../../../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('AddUpdateCguComponent', () => {
    let component: AddUpdateCguComponent;
    let fixture: ComponentFixture<AddUpdateCguComponent>;
  const initialState = {...initSupportState}

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
            declarations: [AddUpdateCguComponent],
          providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(AddUpdateCguComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
