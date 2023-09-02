import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFacadeService } from '../../store/facade/login-facade.service';
import { ILogin, IResponseLogin, IResponseSession } from '../../models/login.model';
import { SessionFacadeService } from '../../store/facade/session-facade.service';
import { Subject, takeUntil } from 'rxjs';
import { StorageService } from '../../../../shared/services/storage.service';
import { AllAppConfig } from '../../../../config';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
    fgLogin!: FormGroup;
    submited = false;

    value1!: string;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private fb: FormBuilder,
        private loginFacadeService: LoginFacadeService,
        private sessionFacadeService: SessionFacadeService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.initForm();

        this.loginFacadeService
            .fetchToken()
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: IResponseLogin) => {
                if (response?.token && response?.refreshToken) {
                    StorageService.local.set(AllAppConfig.NAME_TOKEN_CURRENT_USER, response?.token);
                    StorageService.local.set(AllAppConfig.NAME_REFRESH_TOKEN_CURRENT_USER, response?.refreshToken);
                    this.sessionFacadeService.fetchCurrentSession();
                }
            });

        this.sessionFacadeService
            .currentSession()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: IResponseSession) => {
                    if (response.isAuthenticated) {
                        StorageService.local.set(AllAppConfig.VALUE_CURRENT_USER, JSON.stringify(response.currentUser));
                        this.router.navigate(['/private/dashboard/metrics']);
                    }
                },
            });
    }

    private initForm(): void {
        this.fgLogin = this.fb.nonNullable.group({
            email: new FormControl<string>('', [Validators.email, Validators.required]),
            password: new FormControl<string>('', [Validators.required]),
        });
    }

    submitForm(): void {
        this.submited = true;
        if (this.fgLogin.invalid) {
            return;
        }
        const requestData: ILogin = {
            email: this.fgLogin.getRawValue().email,
            password: this.fgLogin.getRawValue().password,
            idOneSignal: '',
            rememberMe: true,
        };
        this.loginFacadeService.login(requestData);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
