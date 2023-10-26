import { TestBed } from '@angular/core/testing';

import { AuthoritiesService } from './authorities.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthoritiesService', () => {
    let service: AuthoritiesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AuthoritiesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
