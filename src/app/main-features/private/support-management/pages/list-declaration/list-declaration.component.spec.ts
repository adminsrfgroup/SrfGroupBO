import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeclarationComponent } from './list-declaration.component';

describe('ListDeclarationComponent', () => {
    let component: ListDeclarationComponent;
    let fixture: ComponentFixture<ListDeclarationComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListDeclarationComponent],
        });
        fixture = TestBed.createComponent(ListDeclarationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
