import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommonService {
  invokeEvent: Subject<any> = new Subject();

  callNgInit() {
    this.invokeEvent.next()
  }
}
