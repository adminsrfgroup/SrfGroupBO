import { TestBed } from '@angular/core/testing';

import { CguService } from './cgu.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CguService', () => {
    let service: CguService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(CguService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
