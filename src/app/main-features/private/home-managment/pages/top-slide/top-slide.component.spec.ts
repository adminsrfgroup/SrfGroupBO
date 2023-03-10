import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSlideComponent } from './top-slide.component';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';
import { By } from '@angular/platform-browser';

describe('TopSlideComponent', () => {
    let component: TopSlideComponent;
    let fixture: ComponentFixture<TopSlideComponent>;
    const initialState = {};
    let pTable: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [TopSlideComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(TopSlideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have p-table', () => {
        pTable = fixture.nativeElement.querySelector('p-table');
        expect(pTable).toBeTruthy();
    });

    it('should have header/body list of Top Slides', () => {
        // Give
        const listTopSlides: ITopHomeSlidesImages[] = [
            {
                id: 1,
                descriptionAr: 'test',
                descriptionFr: 'test',
                descriptionEn: 'test',
                imageDesktop: 'test',
                imageMobile: 'test',
            },
            {
                id: 2,
                descriptionAr: 'test',
                descriptionFr: 'test',
                descriptionEn: 'test',
                imageDesktop: 'test',
                imageMobile: 'test',
            },
        ];

        // When
        component.listTopSlides = listTopSlides;
        component.loading = false;
        fixture.detectChanges();

        // Then
        const listTrHeader = fixture.debugElement.queryAll(By.css('.p-header-row'));
        expect(listTrHeader).toBeTruthy();
        const listTrBody = fixture.debugElement.queryAll(By.css('.p-selectable-row'));
        expect(listTrBody.length).toEqual(2);
    });
});
