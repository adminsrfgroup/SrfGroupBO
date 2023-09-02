import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganigrammeComponent } from './organigramme.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { SharedModule } from '../../../../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OrganigrammeComponent', () => {
    let component: OrganigrammeComponent;
    let fixture: ComponentFixture<OrganigrammeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule, BrowserAnimationsModule, HttpClientTestingModule, OrganizationChartModule],
            declarations: [OrganigrammeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OrganigrammeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
