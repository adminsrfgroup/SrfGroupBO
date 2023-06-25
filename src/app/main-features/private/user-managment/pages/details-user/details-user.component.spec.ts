import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserComponent } from './details-user.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../../shared/shared.module';

describe('DetailsUserComponent', () => {
    let component: DetailsUserComponent;
    let fixture: ComponentFixture<DetailsUserComponent>;
    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [DetailsUserComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(DetailsUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
