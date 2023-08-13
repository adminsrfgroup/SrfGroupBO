import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/state/user.state';
import { ActivatedRoute } from '@angular/router';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { loadDetailsUser } from '../../store/actions/details-user.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectorUser } from '../../store/selectors/user.selectors';
import { IUser } from '../../../../../shared/models/user.model';

@Component({
    selector: 'app-details-user',
    templateUrl: './details-user.component.html',
    styleUrls: ['./details-user.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DetailsUserComponent implements OnInit, OnDestroy {
    idEntity!: number;

    detailsUser: IUser = {};

    displayModal = false;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<UserState>, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe({
            next: params => {
                this.idEntity = params['id'];
                console.log('this.idEntity ', this.idEntity);
                if (this.idEntity) {
                    const requestData: IdEntity = {
                        id: this.idEntity,
                    };
                    this.store.dispatch(loadDetailsUser(requestData));
                }
            },
        });
    }
    ngOnInit(): void {
        this.store
            .select(selectorUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: UserState) => {
                    console.log('result.entity ', result.entity);
                    if (result.entity && !result.loading) {
                        this.detailsUser = result.entity;
                    }
                },
            });
    }

    updateAuthority() {
        this.displayModal = true;
    }

    ngOnDestroy(): void {}
}
