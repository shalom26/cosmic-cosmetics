import {Component, OnInit} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
import {myColors} from "./colors";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class MyCalendarComponent implements OnInit {
  view: string = 'day';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Netta is making tea ',
      start: setHours(setMinutes(new Date(), 0), 3),
      color: myColors.blue
    },
    {
      title: 'No event end date',
      start: setHours(setMinutes(new Date(), 0), 5),
      color: myColors.yellow
    }
  ];
  constructor() {
  }

  ngOnInit() {
  }

}
