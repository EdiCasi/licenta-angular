import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event';

import { DateAdapter } from '@angular/material/core';
import { AddEventPopUpComponent } from '../add-event-pop-up/add-event-pop-up.component';
import { AskForDeletePopUpComponent } from '../ask-for-delete-pop-up/ask-for-delete-pop-up.component';
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
  public isEditing: Boolean = false;

  public events: Event[] = [];
  public pastEvents: Event[] = [];

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    private dialog: MatDialog
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
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    var todayFormatted = yyyy + '-' + mm + '-' + dd;
    return todayFormatted;
  }
  public dateEequalsToday(date: Date) {
    return date.toString().includes(this.today);
  }

  public onEditClick() {
    this.isEditing = !this.isEditing;
  }

  public openUpdateEventPopUp(event: Event) {
    const dialogRef = this.dialog.open(AddEventPopUpComponent, {
      width: '400px',
      height: '500px',
      data: event,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        event.eventDate = result.eventDate;
        event.eventName = result.eventName;
        event.eventDescription = result.eventDescription;
      }
    });
  }

  public openAddEventPopUp() {
    var objRequest = {
      isInsert: true,
      courseId: this.courseId,
      groupId: this.groupId,
    };

    const dialogRef = this.dialog.open(AddEventPopUpComponent, {
      width: '400px',
      height: '500px',
      data: objRequest,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.events.push(result);
      }
    });
  }

  public openAskForDeletePopUp(event: Event) {
    console.log('here: ');
    const dialogRef = this.dialog.open(AskForDeletePopUpComponent, {
      width: '300px',
      height: '200px',
      data: { eventToDelete: event.eventName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.deleteEventById(event.id);
        var isDeleted = false;
        this.events = this.events?.filter(function (value) {
          if (value == event) {
            isDeleted = true;
          }
          return value != event;
        });
        if (!isDeleted) {
          this.pastEvents = this.pastEvents?.filter(function (value) {
            return value != event;
          });
        }
      }
    });
  }

  private deleteEventById(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(
      (response: any) => {
        alert('Evenimentul a fost sters cu succes');
      },
      (error: HttpErrorResponse) => {
        console.log('ERROR: ' + JSON.stringify(error));
      }
    );
  }
}
