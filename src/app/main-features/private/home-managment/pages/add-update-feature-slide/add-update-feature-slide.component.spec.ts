import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFeatureSlideComponent } from './add-update-feature-slide.component';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../../../shared/shared.module';

describe('AddUpdateFeatureSlideComponent', () => {
    let component: AddUpdateFeatureSlideComponent;
    let fixture: ComponentFixture<AddUpdateFeatureSlideComponent>;
    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [AddUpdateFeatureSlideComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(AddUpdateFeatureSlideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
