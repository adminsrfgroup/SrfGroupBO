import { Component } from '@angular/core';

@Component({
    selector: 'app-private-main',
    templateUrl: './private-main.component.html',
    styleUrls: ['./private-main.component.scss'],
})
export class PrivateMainComponent {

    receiverDescription(value: string){
        console.log('event ', value)
    }
}
