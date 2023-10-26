import { TestBed } from '@angular/core/testing';

import { OrganigrammeService } from './organigramme.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrganigrammeService', () => {
    let service: OrganigrammeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(OrganigrammeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
