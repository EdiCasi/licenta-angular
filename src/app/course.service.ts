import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from './course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiServerUrl = environment.apiBaseUrl + '/course';

  constructor(private http: HttpClient) {}

  public getStudentCourses(studentId: number): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.apiServerUrl}/studentCourse/${studentId}`
    );
  }
}
