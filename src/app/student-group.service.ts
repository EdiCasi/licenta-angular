import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentGroup } from './studentGroup';

@Injectable({
  providedIn: 'root',
})
export class StudentGroupService {
  private apiServerUrl = environment.apiBaseUrl + '/studentGroup';

  constructor(private http: HttpClient) {}

  public getStudentGroups(): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(`${this.apiServerUrl}/all`);
  }
  public updateStudentGroup(
    studentGrup: StudentGroup
  ): Observable<StudentGroup> {
    return this.http.put<StudentGroup>(
      `${this.apiServerUrl}/update`,
      studentGrup
    );
  }
  public addStudentGroup(studentGroup: StudentGroup): Observable<StudentGroup> {
    return this.http.post<StudentGroup>(
      `${this.apiServerUrl}/add`,
      studentGroup
    );
  }
  public deleteStudentGroup(studentGroupId: Number): Observable<any> {
    return this.http.delete<StudentGroup>(
      `${this.apiServerUrl}/delete/${studentGroupId}`
    );
  }
  public getStudentGroupByName(groupName: any): Observable<StudentGroup[]> {
    return this.http.post<StudentGroup[]>(
      `${this.apiServerUrl}/groupByName`,
      groupName
    );
  }
  public getStudentGroupByCourseId(courseId: any): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(
      `${this.apiServerUrl}/groupsBoundedToCourse/${courseId}`
    );
  }
  public searchStudentGroupByNameAndNotInCourse(
    groupName: any,
    courseId: any
  ): Observable<StudentGroup[]> {
    var groupReq = {
      groupName: groupName,
      courseId: courseId,
    };
    return this.http.post<StudentGroup[]>(
      `${this.apiServerUrl}/groupByNameAndNotInCourse`,
      groupReq
    );
  }
}
