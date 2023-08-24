import { TestBed } from '@angular/core/testing';

import { SupportService } from './support.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SupportService', () => {
    let service: SupportService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(SupportService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
