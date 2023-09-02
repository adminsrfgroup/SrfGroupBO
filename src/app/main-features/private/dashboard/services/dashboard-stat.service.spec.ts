import { TestBed } from '@angular/core/testing';

import { DashboardStatService } from './dashboard-stat.service';

describe('DashboardStatService', () => {
    let service: DashboardStatService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DashboardStatService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
