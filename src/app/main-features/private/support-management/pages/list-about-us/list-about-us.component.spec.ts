import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAboutUsComponent } from './list-about-us.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IAboutUsState, initSupportState } from '../../store/state/support.state';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { loadListAboutUs } from '../../store/actions/about-us.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListAboutUsComponent', () => {
    let component: ListAboutUsComponent;
    let fixture: ComponentFixture<ListAboutUsComponent>;
    let store: MockStore;

    const initialState = { ...initSupportState };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListAboutUsComponent],
            providers: [provideMockStore({ initialState })],
        });
        fixture = TestBed.createComponent(ListAboutUsComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(MockStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have table', () => {
        // Given
        const result: IAboutUsState = {
            loading: false,
            entity: {},
            loadingEntities: false,
            entities: [
                {
                    id: 1,
                    contentAr: 'test1',
                    contentEn: 'test1',
                    contentFr: 'test1',
                },
                {
                    id: 2,
                    contentAr: 'test2',
                    contentEn: 'test2',
                    contentFr: 'test2',
                },
            ],
            totalElements: -1,
            totalPages: -1,
            errorMessage: '',
            addSuccess: false,
            updateSuccess: false,
        };
        const page = 0;
        const size = 2;

        // When
        store.dispatch(
            loadListAboutUs({
                page: page,
                size: size,
            })
        );
        component.listAboutUs.set(result.entities.slice());
        component.totalElements.set(result.totalElements);
        component.totalPages.set(result.totalPages);
        component.loading.set(result.loadingEntities);

        // then
        expect(component.listAboutUs().length).toEqual(2);
        expect(component.table).toBeTruthy();
        expect(component.table.bodyTemplate).toBeTruthy();
    });
});
