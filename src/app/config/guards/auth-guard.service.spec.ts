import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { StoreModule } from '@ngrx/store';

describe('AuthGuardService', () => {
    let service: AuthGuardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StoreModule.forRoot()],
        });
        service = TestBed.inject(AuthGuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
