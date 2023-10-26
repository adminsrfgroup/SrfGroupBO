import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsComponent } from './metrics.component';
import { initDashboardState } from '../../store/state/dashboard.state';
import { provideMockStore } from '@ngrx/store/testing';

describe('MetricsComponent', () => {
    let component: MetricsComponent;
    let fixture: ComponentFixture<MetricsComponent>;
    const initialState = initDashboardState.metrics;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MetricsComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(MetricsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
