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
      `${this.apiServerUrl}/studentCourses/${studentId}`
    );
  }

  public getProfessorCourses(professorId: number): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.apiServerUrl}/professorCourses/${professorId}`
    );
  }
  public addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiServerUrl}/add`, course);
  }
  public updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiServerUrl}/update`, course);
  }
  public deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/delete/${courseId}`);
  }
}
