import { TestBed } from '@angular/core/testing';

import { OfferService } from './offer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {SharedModule} from "../../../../shared/shared.module";

describe('OfferService', () => {
    let service: OfferService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SharedModule, HttpClientTestingModule],
        });
        service = TestBed.inject(OfferService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
