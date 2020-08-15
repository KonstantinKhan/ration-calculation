import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/services/date.service';

@Component({
  selector: 'app-ration',
  templateUrl: './ration.component.html',
  styleUrls: ['./ration.component.scss']
})
export class RationComponent implements OnInit {

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
  }

}
