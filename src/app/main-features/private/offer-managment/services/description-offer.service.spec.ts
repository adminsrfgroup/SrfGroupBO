import { TestBed } from '@angular/core/testing';

import { DescriptionOfferService } from './description-offer.service';
import { SharedModule } from '../../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DescriptionOfferService', () => {
    let service: DescriptionOfferService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, HttpClientTestingModule],
        });
        service = TestBed.inject(DescriptionOfferService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
