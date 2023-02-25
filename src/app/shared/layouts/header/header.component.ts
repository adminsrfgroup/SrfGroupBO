import { Component } from '@angular/core';
import {SessionFacadeService} from "../../../main-features/login/store/facade/session-facade.service";
import {StorageService} from "../../services/storage.service";
import {AllAppConfig} from "../../../config";
import {Router} from "@angular/router";
import {LoginFacadeService} from "../../../main-features/login/store/facade/login-facade.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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
                private loginFacadeService: LoginFacadeService,
                private router: Router) {
    }

    showModalDialog() {
      this.displayModal = true;
    }

    logout(): void{
      StorageService.local.remove(AllAppConfig.NAME_TOKEN_CURRENT_USER);
      StorageService.local.remove(AllAppConfig.NAME_REFRESH_TOKEN_CURRENT_USER);
      StorageService.local.remove(AllAppConfig.VALUE_CURRENT_USER);
      this.sessionFacadeService.logout();
      this.loginFacadeService.resetLogin();
      this.displayModal = false;
      this.router.navigate(['/login']).then();
    }
}
