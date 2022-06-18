import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
import { EventSummary } from '../eventSummary';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  professorType: string = 'professor';
  studentType: string = 'student';
  adminType: string = 'admin';
  public loggedUser: Account | null = null;
  public today: string;

  public events: EventSummary[];
  constructor(private auth: AuthService, private eventService: EventService) {}

  ngOnInit(): void {
    this.loggedUser = this.auth.getLoggedUser();
    this.today = this.getTodayDate();
    if (
      this.loggedUser.userType == this.professorType ||
      this.loggedUser.userType == this.studentType
    ) {
      this.getEvents(this.loggedUser.userType);
    }
  }
  private getEvents(userType: string) {
    if (userType == this.professorType) {
      this.getProfessorEvents(Number(this.loggedUser?.id));
    } else {
      this.getStudentEvents(Number(this.loggedUser?.id));
    }
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
  private getProfessorEvents(professorId: number) {
    this.eventService.getStudentEvents(professorId).subscribe(
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
