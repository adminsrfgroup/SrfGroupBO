import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { SessionFacadeService } from '../../../main-features/login/store/facade/session-facade.service';
import { Router } from '@angular/router';
import { LoginFacadeService } from '../../../main-features/login/store/facade/login-facade.service';
import { Store } from '@ngrx/store';
import { SessionState } from '../../../main-features/login/store/state/session.state';
import { logoutAction } from '../../../main-features/login/store/actions/session.action';
import { selectorSession } from '../../../main-features/login/store/selectors/session.selectors';
import { Subject, takeUntil } from 'rxjs';
import { IResponseSession } from '../../../main-features/login/models/login.model';
import { StorageService } from '../../services/storage.service';
import { AllAppConfig } from '../../../config';
import { IUser } from '../../models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
        },
        {
            label: 'Angular Website',
            icon: 'pi pi-external-link',
        },
        {
            label: 'Logout',
            icon: 'pi pi-upload',
            command: () => {
                console.log('logout');
                this.displayModal = true;
            },
        },
    ];

    displayModal = false;

    storeSession = inject(Store<SessionState>);

    destroy$: Subject<boolean> = new Subject<boolean>();

    currentUser: WritableSignal<IUser> = signal<IUser>({});

    constructor() // private router: Router // private loginFacadeService: LoginFacadeService, // private sessionFacadeService: SessionFacadeService,
    {}

    ngOnInit(): void {
        this.storeSession
            .select(selectorSession)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: IResponseSession) => {
                    this.currentUser.set(response.currentUser);
                },
            });
    }

    showModalDialog(): void {
        this.displayModal = true;
    }

    logout(): void {
        this.storeSession.dispatch(logoutAction());
        this.displayModal = false;
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
