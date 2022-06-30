import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../event.service';
import { Event } from '../event';

@Component({
  selector: 'app-add-event-pop-up',
  templateUrl: './add-event-pop-up.component.html',
  styleUrls: ['./add-event-pop-up.component.css'],
})
export class AddEventPopUpComponent implements OnInit {
  public newEventName: string;
  public newEventDescription: string;
  public inputErrors: Boolean = false;
  public newEventDate: Date;
  public today: Date;
  public isInsert: Boolean;
  public eventToUpdate: Event;
  constructor(
    public dialogRef: MatDialogRef<AddEventPopUpComponent>,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public objectReceived: any
  ) {
    this.isInsert = objectReceived.isInsert;

    if (this.isInsert) {
      this.eventToUpdate = new Event();
      this.eventToUpdate.courseId = objectReceived.courseId;
      this.eventToUpdate.studentGroupId = objectReceived.groupId;
      this.newEventDate = new Date();
    } else {
      this.eventToUpdate = objectReceived;
      this.newEventDate = this.eventToUpdate.eventDate;
      this.newEventName = this.eventToUpdate.eventName;
      this.newEventDescription = this.eventToUpdate.eventDescription;
    }
  }
  ngOnInit(): void {
    this.today = new Date();
  }

  onOkClick() {
    this.inputErrors = this.validateInput();

    if (!this.inputErrors) {
      var event: Event = {
        id: 0,
        studentGroupId: this.eventToUpdate.studentGroupId,
        courseId: this.eventToUpdate.courseId,
        eventDate: this.isInsert
          ? new Date(this.getFormattedDate(this.newEventDate))
          : this.eventToUpdate.eventDate,
        eventName: this.newEventName,
        eventDescription: this.newEventDescription,
      };
      if (this.isInsert) {
        this.addEvent(event);
      } else {
        event.id = this.eventToUpdate.id;
        console.log(event.id);
        this.updateEvent(event);
      }
    }
  }

  public updateEvent(event: Event) {
    this.eventService.updateEvent(event).subscribe(
      (response: Event) => {
        alert(
          'Evenimentul: ' + response.eventName + ' a fost modificat cu succes!'
        );
        this.dialogRef.close(response);
      },
      (error: HttpErrorResponse) => {
        console.log('==Error add course: ' + JSON.stringify(error));
      }
    );
  }

  public addEvent(event: Event) {
    this.eventService.addEvent(event).subscribe(
      (response: Event) => {
        alert(
          'Evenimentul: ' + response.eventName + ' a fost adaugat cu succes!'
        );
        this.dialogRef.close(response);
      },
      (error: HttpErrorResponse) => {
        console.log('==Error add course: ' + JSON.stringify(error));
      }
    );
  }

  validateInput(): Boolean {
    if (this.newEventName == '' || this.newEventName == undefined) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (
      this.newEventDescription == '' ||
      this.newEventDescription == undefined
    ) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (this.newEventDate == undefined) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    return false;
  }

  onInputChange(): void {
    this.inputErrors = false;
  }

  public getFormattedDate(date: Date) {
    console.log('Dta: ' + date);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();

    var formattedDate = yyyy + '-' + mm + '-' + dd + 'T06:00:00';
    return formattedDate;
  }
}
