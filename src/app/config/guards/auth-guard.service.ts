import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SessionService } from '../../main-features/login/services/session.service';

// @Injectable({
//     providedIn: 'root',
// })
// export class AuthGuardService implements CanActivate {
//     constructor(private sessionFacadeService: SessionFacadeService) {}
//
//     canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//         return this.sessionFacadeService.isAuthenticated();
//     }
// }

export const canActivatePrivate: CanActivateFn = () => {
    return inject(SessionService).isAuthenticated();
};
