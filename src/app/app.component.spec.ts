import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, ToastModule],
            declarations: [AppComponent],
            providers: [MessageService, provideMockStore({ initialState })],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    // it("should have as title 'SrfgroupBO'", () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.componentInstance;
    //     expect(app.title).toEqual('SrfgroupBO');
    // });
    //
    // it('should render title', () => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.nativeElement as HTMLElement;
    //     expect(compiled.querySelector('.content span')?.textContent).toContain('SrfgroupBO app is running!');
    // });
});
