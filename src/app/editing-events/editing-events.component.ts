import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event';

import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-editing-events',
  templateUrl: './editing-events.component.html',
  styleUrls: ['./editing-events.component.css'],
})
export class EditingEventsComponent implements OnInit {
  public groupId: number;
  public courseId: number;
  public groupName: string;
  public today: string;

  public events: Event[];
  public pastEvents: Event[];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.today = this.getTodayDate();

    this.groupId = Number(this.route.snapshot.paramMap.get('studentGroupId'));
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.groupName = this.route.snapshot.paramMap.get('groupName') || '';

    this.getEventsByCourseAndGroupe(this.groupId, this.courseId);
    this.getEventsByCourseAndGroupeOld(this.groupId, this.courseId);
  }

  private getEventsByCourseAndGroupe(groupId: number, courseId: number) {
    this.eventService.getEventsByGroupAndCourse(groupId, courseId).subscribe(
      (response: Event[]) => {
        this.events = response;
      },
      (error: HttpErrorResponse) => {
        console.log('ERROR: ' + JSON.stringify(error));
      }
    );
  }
  private getEventsByCourseAndGroupeOld(groupId: number, courseId: number) {
    this.eventService.getEventsByGroupAndCourseOld(groupId, courseId).subscribe(
      (response: Event[]) => {
        this.pastEvents = response;
      },
      (error: HttpErrorResponse) => {
        console.log('ERROR: ' + JSON.stringify(error));
      }
    );
  }

  public getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var todayFormatted = yyyy + '-' + mm + '-' + dd;
    return todayFormatted;
  }
  public dateEequalsToday(date: Date) {
    return date.toString().includes(this.today);
  }
}
