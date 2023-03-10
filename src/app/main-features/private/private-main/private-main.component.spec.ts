import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMainComponent } from './private-main.component';
import { SideBarComponent } from '../../../shared/layouts/side-bar/side-bar.component';
import { HeaderComponent } from '../../../shared/layouts/header/header.component';
import { BreadcrumbComponent } from '../../../shared/layouts/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../../shared/layouts/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../shared/shared.module';

describe('PrivateMainComponent', () => {
    let component: PrivateMainComponent;
    let fixture: ComponentFixture<PrivateMainComponent>;
    const initialState = {};
    let appHeader, appFooter, appBreadcrumb: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, RouterTestingModule, SharedModule],
            declarations: [PrivateMainComponent, SideBarComponent, HeaderComponent, BreadcrumbComponent, FooterComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(PrivateMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have header child', () => {
        appHeader = fixture.nativeElement.querySelector('app-header');
        expect(appHeader).toBeTruthy();
    });

    it('should have footer child', () => {
        appFooter = fixture.nativeElement.querySelector('app-footer');
        expect(appFooter).toBeTruthy();
    });

    it('should have footer breadcrumb', () => {
        appBreadcrumb = fixture.nativeElement.querySelector('app-breadcrumb');
        expect(appBreadcrumb).toBeTruthy();
    });
});
