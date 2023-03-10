import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeatureSlideComponent } from './list-feature-slide.component';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListFeatureSlideComponent', () => {
    let component: ListFeatureSlideComponent;
    let fixture: ComponentFixture<ListFeatureSlideComponent>;
    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule, RouterTestingModule],
            declarations: [ListFeatureSlideComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(ListFeatureSlideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
