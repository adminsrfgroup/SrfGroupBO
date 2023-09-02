import { SgDatePipe } from './sg-date.pipe';
import { DatePipe } from '@angular/common';

describe('SgDatePipe', () => {
    it('create an instance', () => {
        const datePipe: DatePipe = new DatePipe('fr');
        const pipe = new SgDatePipe(datePipe);
        expect(pipe).toBeTruthy();
    });
});
