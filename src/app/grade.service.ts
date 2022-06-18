import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grade } from './grade';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private apiServerUrl = environment.apiBaseUrl + '/grade';

  constructor(private http: HttpClient) {}

  public getStudentGradesForCourse(
    studentId: number,
    courseId: number
  ): Observable<Grade[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('studentId', studentId);
    queryParams = queryParams.append('courseId', courseId);
    return this.http.get<Grade[]>(
      `${this.apiServerUrl}/gradeByCourseAndStudent`,
      {
        params: queryParams,
      }
    );
  }

  public addGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(`${this.apiServerUrl}/add`, grade);
  }
  public updateGrade(grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.apiServerUrl}/update`, grade);
  }
  public deleteGrade(gradeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/delete/${gradeId}`);
  }
}
