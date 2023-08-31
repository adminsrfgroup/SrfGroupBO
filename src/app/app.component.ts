import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionState } from './main-features/login/store/state/session.state';
import { selectorSession } from './main-features/login/store/selectors/session.selectors';
import { StorageService } from './shared/services/storage.service';
import { AllAppConfig } from './config';
import { Router } from '@angular/router';
import { LoginState } from './main-features/login/store/state/login.state';
import { resetLoginAction } from './main-features/login/store/actions/login.action';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private router: Router,
        private sotreSession: Store<SessionState>,
        private storeLogin: Store<LoginState>
    ) {}

    ngOnInit(): void {
        this.sotreSession.select(selectorSession).subscribe({
            next: (result: SessionState) => {
                if (!result.isAuthenticated && !result.loading) {
                    StorageService.local.remove(AllAppConfig.NAME_TOKEN_CURRENT_USER);
                    StorageService.local.remove(AllAppConfig.NAME_REFRESH_TOKEN_CURRENT_USER);
                    StorageService.local.remove(AllAppConfig.VALUE_CURRENT_USER);
                    this.storeLogin.dispatch(resetLoginAction());
                    this.router.navigate(['/login']).then();
                }
            },
        });
    }
}
