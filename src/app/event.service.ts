import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from './event';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiServerUrl = environment.apiBaseUrl + '/event';

  constructor(private http: HttpClient) {}

  public addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiServerUrl}/add`, event);
  }
  public updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiServerUrl}/update`, event);
  }
  public deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/delete/${eventId}`);
  }

  public getStudentEvents(studentId: number): Observable<Event[]> {
    return this.http.get<Event[]>(
      `${this.apiServerUrl}/studentEvents/${studentId}`
    );
  }
  public getProfessorEvents(professorId: number): Observable<Event[]> {
    return this.http.get<Event[]>(
      `${this.apiServerUrl}/professorEvents/${professorId}`
    );
  }

  public getEventsByGroupAndCourse(
    groupId: number,
    courseId: number
  ): Observable<Event[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('groupId', groupId);
    queryParams = queryParams.append('courseId', courseId);
    return this.http.get<Event[]>(`${this.apiServerUrl}/byGroupAndCourse`, {
      params: queryParams,
    });
  }
  public getEventsByGroupAndCourseOld(
    groupId: number,
    courseId: number
  ): Observable<Event[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('groupId', groupId);
    queryParams = queryParams.append('courseId', courseId);
    return this.http.get<Event[]>(`${this.apiServerUrl}/byGroupAndCourseOld`, {
      params: queryParams,
    });
  }
}
