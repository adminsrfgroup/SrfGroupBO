import { TestBed } from '@angular/core/testing';

import { FeatureHomeService } from './feature-home.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FeatureHomeService', () => {
    let service: FeatureHomeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(FeatureHomeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
