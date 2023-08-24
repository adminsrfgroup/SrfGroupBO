import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCguComponent } from './list-cgu.component';

describe('ListCguComponent', () => {
    let component: ListCguComponent;
    let fixture: ComponentFixture<ListCguComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListCguComponent],
        });
        fixture = TestBed.createComponent(ListCguComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
