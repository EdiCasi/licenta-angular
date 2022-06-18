import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
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
  public courseId: number;
  public groupId: number;
  public eventToUpdate: Event;
  constructor(
    public dialogRef: MatDialogRef<AddEventPopUpComponent>,
    private dateAdapter: DateAdapter<Date>,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public objectReceived: any
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.isInsert = objectReceived.isInsert;
    console.log('this.objectReceived: ' + JSON.stringify(objectReceived));
    if (this.isInsert) {
      this.courseId = objectReceived.courseId;
      this.groupId = objectReceived.groupId;
    } else {
      this.eventToUpdate = objectReceived;
      this.newEventDate = this.eventToUpdate.eventDate;
      this.newEventName = this.eventToUpdate.eventName;
      this.newEventDescription = this.eventToUpdate.eventDescription;
    }
  }
  ngOnInit(): void {
    this.today = new Date();
    this.newEventDate = new Date();
  }

  onAddClick() {
    this.inputErrors = this.validateInput();
    if (!this.inputErrors) {
      if (this.isInsert) {
        var event: Event = {
          id: 0,
          studentGroupId: this.groupId,
          courseId: this.courseId,
          eventDate: this.newEventDate,
          eventName: this.newEventName,
          eventDescription: this.newEventDescription,
        };
        this.addEvent(event);
      } else {
        this.eventToUpdate.eventName = this.newEventName;
        this.eventToUpdate.eventDescription = this.newEventDescription;
        this.eventToUpdate.eventDate = this.newEventDate;
        console.log(
          'this.eventToUpdate: ' + JSON.stringify(this.eventToUpdate)
        );
        this.updateEvent(this.eventToUpdate);
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
}
