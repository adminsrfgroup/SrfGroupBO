import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateAboutUsComponent } from './add-update-about-us.component';

describe('AddUpdateAboutUsComponent', () => {
    let component: AddUpdateAboutUsComponent;
    let fixture: ComponentFixture<AddUpdateAboutUsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddUpdateAboutUsComponent],
        });
        fixture = TestBed.createComponent(AddUpdateAboutUsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
