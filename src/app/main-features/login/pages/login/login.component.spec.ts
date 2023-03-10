import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideMockStore } from '@ngrx/store/testing';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    const initialState = {
        loading: false,
        errorMessage: null,
        token: '',
        refreshToken: '',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PasswordModule, ReactiveFormsModule],
            declarations: [LoginComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form validity', () => {
        expect(component.fgLogin.valid).toBeFalsy();

        const email = component.fgLogin.get('email');
        const errorsEmail = email?.errors || {};
        expect(email?.valid).toBeFalsy();
        expect(errorsEmail['required']).toBeTruthy();

        const password = component.fgLogin.get('password');
        const errorsPassword = password?.errors || {};
        expect(password?.valid).toBeFalsy();
        expect(errorsPassword['required']).toBeTruthy();
    });

    it('Show error message whene submit invalid form', () => {
        // Given
        expect(component.fgLogin.valid).toBeFalsy();

        component.fgLogin.get('email')?.setValue('test');
        component.fgLogin.get('password')?.setValue('test');

        // When
        component.submitForm();

        // Then
        fixture.detectChanges();
        const messageErrorEmail = fixture.debugElement.query(By.css('#email-help'));
        expect(messageErrorEmail).toBeTruthy();
    });

    it('Submitting a valid form ', () => {
        // Given
        expect(component.fgLogin.valid).toBeFalsy();
        component.fgLogin.get('email')?.setValue('test@test.com');
        component.fgLogin.get('password')?.setValue('123456789');
        expect(component.fgLogin.valid).toBeTruthy();

        // When
        component.submitForm();

        // Then
        expect(component.submited).toBeTrue();
    });
});
