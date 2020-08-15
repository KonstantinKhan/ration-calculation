import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateService {

  currentDate(): Date {
    return new Date();
  }

}
