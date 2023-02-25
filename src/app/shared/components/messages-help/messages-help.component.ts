import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-messages-help',
    templateUrl: './messages-help.component.html',
    styleUrls: ['./messages-help.component.scss'],
})
export class MessagesHelpComponent {
    @Input() control!: AbstractControl;
    @Input() submitted!: boolean;
    @Input() errorMessage!: string;
}
