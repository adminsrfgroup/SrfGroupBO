import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesHelpComponent } from './messages-help.component';

describe('MessagesHelpComponent', () => {
    let component: MessagesHelpComponent;
    let fixture: ComponentFixture<MessagesHelpComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MessagesHelpComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MessagesHelpComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
