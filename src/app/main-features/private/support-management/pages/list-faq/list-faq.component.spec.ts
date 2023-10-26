import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFaqComponent } from './list-faq.component';
import { IFaqState } from '../../store/state/support.state';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ListFaqComponent', () => {
    let component: ListFaqComponent;
    let fixture: ComponentFixture<ListFaqComponent>;
    let storeFaq: MockStore;
    const initialState: IFaqState = {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [
            {
                id: 1,
                questionAr: 'test',
            },
        ],
        totalElements: -1,
        totalPages: -1,
        errorMessage: '',
        addSuccess: false,
        updateSuccess: false,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule, HttpClientTestingModule],
            declarations: [ListFaqComponent],
            providers: [provideMockStore({ initialState })],
        });

        storeFaq = TestBed.inject(MockStore);

        fixture = TestBed.createComponent(ListFaqComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('get list items', () => {
        // Given
        storeFaq.setState({
            support: {
                faq: {
                    ...initialState,
                },
            },
        });
        component.ngOnInit();

        // When
        component.nextPage({
            first: 0,
        });

        // Then
        expect(component.listFaq().length).toEqual(1);
        const dataTable: DebugElement = fixture.debugElement;
        const dataTableTbody = dataTable.query(By.css('.p-datatable-tbody'));
        expect(dataTableTbody).toBeTruthy();

        const bannerElement: HTMLElement = fixture.nativeElement;
        const trDataTableTbody = bannerElement.querySelectorAll('.p-datatable-tbody tr')!;
        expect(trDataTableTbody.length).toEqual(1);
    });
});
