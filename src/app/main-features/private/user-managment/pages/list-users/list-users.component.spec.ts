import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersComponent } from './list-users.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextModule } from 'primeng/inputtext';
import { provideMockStore } from '@ngrx/store/testing';
import {SharedModule} from "../../../../../shared/shared.module";

describe('ListUsersComponent', () => {
    let component: ListUsersComponent;
    let fixture: ComponentFixture<ListUsersComponent>;
    const initialState = {};

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [ListUsersComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(ListUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
