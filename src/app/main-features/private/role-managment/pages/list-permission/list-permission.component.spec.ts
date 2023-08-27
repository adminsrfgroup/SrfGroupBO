import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPermissionComponent } from './list-permission.component';
import {provideMockStore} from "@ngrx/store/testing";
import {initRoleState} from "../../store/state/init.state";
import {SharedModule} from "../../../../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ListPermissionComponent', () => {
    let component: ListPermissionComponent;
    let fixture: ComponentFixture<ListPermissionComponent>;

  const initialState = {...initRoleState}

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListPermissionComponent],
          providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListPermissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
