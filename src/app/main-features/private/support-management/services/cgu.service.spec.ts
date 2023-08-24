import { TestBed } from '@angular/core/testing';

import { CguService } from './cgu.service';

describe('CguService', () => {
    let service: CguService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CguService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
