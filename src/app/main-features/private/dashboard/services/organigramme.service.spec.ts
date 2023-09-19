import { TestBed } from '@angular/core/testing';

import { OrganigrammeService } from './organigramme.service';

describe('OrganigrammeService', () => {
  let service: OrganigrammeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganigrammeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
