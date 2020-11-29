import {Injectable} from '@angular/core';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Injectable({providedIn: 'root'})
export class DateService {

  // currentDate(): Date {
  //   return new Date();
  // }

  currentDate(): NgbDate {
    const currentDate: Date = new Date();
    return new NgbDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
  }

  dateToStringFormat(date: Date): string {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  getCurrentDateStr(): string {
    return this.currentDate().year + '-' + this.currentDate().month + '-' + this.currentDate().day;
  }
}
