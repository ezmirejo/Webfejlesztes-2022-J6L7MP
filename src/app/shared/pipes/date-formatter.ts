import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

    transform(value: Timestamp , ...args: unknown[]): string {
        return value.toDate().toLocaleString()
    }

}
