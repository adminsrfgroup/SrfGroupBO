import { Injectable } from '@angular/core';
import { SessionFacadeService } from '../../main-features/login/store/facade/session-facade.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(private sessionFacadeService: SessionFacadeService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.sessionFacadeService.isAuthenticated();
    }
}
