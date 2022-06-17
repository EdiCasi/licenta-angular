import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CourseToGroupRelationService {
  private apiServerUrl = environment.apiBaseUrl + '/courseGroup';

  constructor(private http: HttpClient) {}

  public addCourseToGroup(courseToGroup: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/add`, courseToGroup);
  }

  public deleteCourseToGroup(
    courseId: number,
    groupId: number
  ): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('courseId', courseId);
    queryParams = queryParams.append('groupId', groupId);
    return this.http.delete<any>(`${this.apiServerUrl}/deleteByFields`, {
      params: queryParams,
    });
  }
}
