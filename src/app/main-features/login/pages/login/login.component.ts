import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { LoginFacadeService } from '../../store/facade/login-facade.service';
import { ILogin, IResponseLogin, IResponseSession } from '../../models/login.model';
import { SessionFacadeService } from '../../store/facade/session-facade.service';
import { Subject, takeUntil } from 'rxjs';
import { StorageService } from '../../../../shared/services/storage.service';
import { AllAppConfig } from '../../../../config';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  // matcher = new MyErrorStateMatcher();

  hide = true;

  fgLogin!: FormGroup;
    submited = false;

    value1!: string;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private fb: FormBuilder, private loginFacadeService: LoginFacadeService, private sessionFacadeService: SessionFacadeService, private router: Router) {}

    ngOnInit(): void {
        this.initForm();

        const t = this.fgLogin.get('email')?.value;
        console.log(typeof t);

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
                    console.log('response for session ', response);
                    if (response.isAuthenticated) {
                        StorageService.local.set(AllAppConfig.VALUE_CURRENT_USER, JSON.stringify(response.currentUser));
                        this.router.navigate(['/private/dashboard/home']);
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

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
