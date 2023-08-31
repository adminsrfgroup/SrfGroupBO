import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'sgDate',
})
export class SgDatePipe implements PipeTransform {
    constructor(private datePipe: DatePipe) {}
    transform(value: Date | string | number | null | undefined): string | null {
        return this.datePipe.transform(value, 'short');
    }
}
