import { TestBed } from '@angular/core/testing';

import { DescriptionOfferService } from './description-offer.service';

describe('DescriptionOfferService', () => {
  let service: DescriptionOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
