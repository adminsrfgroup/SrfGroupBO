import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pagination } from '../../../../../shared/models/page.common';
import { SupportService } from '../../services/support.service';
import { loadListContactUs, loadListContactUsFailure, loadListContactUsSuccess } from '../actions/contact-us.actions';
import { AboutUsService } from '../../services/about-us.service';
import { IAboutUs } from '../../../../../shared/models/about-us.model';
import {
    addAboutUs,
    addAboutUsFailure,
    addAboutUsSuccess,
    fetchOneAboutUs,
    fetchOneAboutUsFailure,
    fetchOneAboutUsSuccess,
    loadListAboutUs,
    loadListAboutUsFailure,
    loadListAboutUsSuccess,
} from '../actions/about-us.actions';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { NewsletterService } from '../../services/newsletter.service';
import { loadListNewsLetter, loadListNewsLetterFailure, loadListNewsLetterSuccess } from '../actions/newsletter.actions';
import { FaqService } from '../../services/faq.service';
import {
    addFaq,
    addFaqFailure,
    addFaqSuccess,
    fetchOneFaq,
    fetchOneFaqFailure,
    fetchOneFaqSuccess,
    loadListFaq,
    loadListFaqFailure,
    loadListFaqSuccess,
    updateFaq,
    updateFaqFailure,
    updateFaqSuccess,
} from '../actions/faq.actions';
import { IFaq } from '../../../../../shared/models/faq.model';
import { CguService } from '../../services/cgu.service';
import { addCgu, addCguFailure, addCguSuccess, loadListCgu, loadListCguFailure, loadListCguSuccess, updateCgu, updateCguFailure, updateCguSuccess } from '../actions/cgu.actions';
import { ICgu } from '../../../../../shared/models/cgu.model';

@Injectable()
export class SupportEffects {
    constructor(
        private actions$: Actions,
        private supportService: SupportService,
        private aboutUsService: AboutUsService,
        private newsletterService: NewsletterService,
        private faqService: FaqService,
        private cguService: CguService
    ) {}

    fetchListContactUs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListContactUs.type),
            switchMap((payload: Pagination) => {
                return this.supportService.fetchAllContactUs(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListContactUsSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListContactUsFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    addAboutUs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addAboutUs.type),
            switchMap((payload: IAboutUs) => {
                return this.aboutUsService.addAboutUs(payload).pipe(
                    map((data: any) => {
                        return addAboutUsSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(addAboutUsFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchAllboutUs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListAboutUs.type),
            switchMap((payload: Pagination) => {
                return this.aboutUsService.fetchAllAboutUs(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListAboutUsSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListAboutUsFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchOneAboutUs = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchOneAboutUs.type),
            switchMap((payload: IdEntity) => {
                return this.aboutUsService.fetchOneAboutUs(payload.id).pipe(
                    map((data: IAboutUs) => {
                        return fetchOneAboutUsSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(fetchOneAboutUsFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchListNewsLetter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListNewsLetter.type),
            switchMap((payload: Pagination) => {
                return this.newsletterService.fetchAllNewsLetter(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListNewsLetterSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListNewsLetterFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchListFaq$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListFaq.type),
            switchMap((payload: Pagination) => {
                return this.faqService.fetchAllFaq(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListFaqSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListFaqFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    addFaq$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addFaq.type),
            switchMap((payload: IFaq) => {
                return this.faqService.addFaq(payload).pipe(
                    map((data: any) => {
                        return addFaqSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(addFaqFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchOneFaq = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchOneFaq.type),
            switchMap((payload: IdEntity) => {
                return this.faqService.fetchOneFaq(payload.id).pipe(
                    map((data: IAboutUs) => {
                        return fetchOneFaqSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(fetchOneFaqFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    updateFaq = createEffect(() =>
        this.actions$.pipe(
            ofType(updateFaq.type),
            switchMap((payload: IFaq) => {
                return this.faqService.updateFaq(payload).pipe(
                    map((data: IAboutUs) => {
                        return updateFaqSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(updateFaqFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchListCgu$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListCgu.type),
            switchMap(() => {
                return this.cguService.fetchCgu().pipe(
                    map((data: any) => {
                        return loadListCguSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListCguFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    addCgu$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCgu.type),
            switchMap((payload: ICgu) => {
                return this.cguService.addCgu(payload).pipe(
                    map((data: any) => {
                        return addCguSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(addCguFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    updateCgu$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCgu.type),
            switchMap((payload: ICgu) => {
                return this.cguService.updateCgu(payload).pipe(
                    map((data: any) => {
                        return updateCguSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(updateCguFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
