import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactUsComponent } from './list-contact-us.component';

describe('ListContactUsComponent', () => {
    let component: ListContactUsComponent;
    let fixture: ComponentFixture<ListContactUsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListContactUsComponent],
        });
        fixture = TestBed.createComponent(ListContactUsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
