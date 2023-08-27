import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsComponent } from './logs.component';
import {OrganizationChartModule} from "primeng/organizationchart";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../../../../shared/shared.module";
import {provideMockStore} from "@ngrx/store/testing";
import {initDashboardState} from "../../store/state/dashboard.state";

describe('LogsComponent', () => {
    let component: LogsComponent;
    let fixture: ComponentFixture<LogsComponent>;

    const initialState = {...initDashboardState}

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [SharedModule, OrganizationChartModule, HttpClientTestingModule],
          declarations: [LogsComponent],
          providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(LogsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
