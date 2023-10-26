import { TestBed } from '@angular/core/testing';

import { DashboardStatService } from './dashboard-stat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardStatService', () => {
    let service: DashboardStatService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(DashboardStatService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
