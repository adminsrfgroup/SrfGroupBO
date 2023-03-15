import {Component, TemplateRef} from '@angular/core';
import { SessionFacadeService } from '../../../main-features/login/store/facade/session-facade.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

    dialogRef!: MatDialogRef<any>;

    items = [
        {
            label: 'Update',
            icon: 'pi pi-refresh',
        },
        {
            label: 'Delete',
            icon: 'pi pi-times',
        },
        {
            label: 'Angular Website',
            icon: 'pi pi-external-link',
            url: 'http://angular.io',
        },
        {
            label: 'Router',
            icon: 'pi pi-upload',
            routerLink: '/fileupload',
        },
    ];

    displayModal: boolean = false;

    constructor(private sessionFacadeService: SessionFacadeService,
                private dialog: MatDialog) {}

    showModalDialog() {
        this.displayModal = true;
    }

    logout(templateRef: TemplateRef<any>): void {
      this.dialogRef = this.dialog.open(templateRef, {
          width: '250px',
        });
    }

    onConfirmLogout(): void {
      this.dialogRef.close();
      this.sessionFacadeService.logout();
      this.displayModal = false;
    }
}
