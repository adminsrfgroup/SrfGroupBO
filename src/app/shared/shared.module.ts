import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesHelpComponent } from './components/messages-help/messages-help.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ImageModule } from 'primeng/image';

@NgModule({
    declarations: [SideBarComponent, HeaderComponent, FooterComponent, BreadcrumbComponent, MessagesHelpComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ToolbarModule,
        CardModule,
        ButtonModule,
        SplitButtonModule,
        AccordionModule,
        BreadcrumbModule,
        ToastModule,
        PasswordModule,
        FormsModule,
        DialogModule,
        TableModule,
        DropdownModule,
        CalendarModule,
        MultiSelectModule,
        ProgressBarModule,
        SliderModule,
        ContextMenuModule,
        InputTextModule,
        EditorModule,
        ConfirmDialogModule,
        MessagesModule,
        ImageModule,
    ],
    exports: [
        CardModule,
        ButtonModule,
        SideBarComponent,
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
        ToastModule,
        PasswordModule,
        FormsModule,
        TableModule,
        DropdownModule,
        CalendarModule,
        MultiSelectModule,
        ProgressBarModule,
        SliderModule,
        ContextMenuModule,
        InputTextModule,
        EditorModule,
        DialogModule,
        ConfirmDialogModule,
        MessagesModule,
        ImageModule,
    ],
    providers: [MessageService],
})
export class SharedModule {}
