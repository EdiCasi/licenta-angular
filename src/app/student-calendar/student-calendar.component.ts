import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../event.service';
import { EventSummary } from '../eventSummary';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-student-calendar',
  templateUrl: './student-calendar.component.html',
  styleUrls: ['./student-calendar.component.css'],
})
export class StudentCalendarComponent implements OnInit {
  public studentId: number;
  public today: string;

  public events: EventSummary[];

  constructor(private eventService: EventService, private auth: AuthService) {}

  ngOnInit(): void {
    this.today = this.getTodayDate();

    this.studentId = this.auth.getLoggedUser().id;

    this.getStudentEvents(this.studentId);
  }

  private getStudentEvents(studentId: number) {
    this.eventService.getStudentEvents(studentId).subscribe(
      (response: EventSummary[]) => {
        this.events = response;
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
