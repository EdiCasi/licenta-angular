import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserToGroup } from './userToGroup';

@Injectable({
  providedIn: 'root',
})
export class UserToGroupService {
  private apiServerUrl = environment.apiBaseUrl + '/student';
  constructor(private http: HttpClient) {}

  public updateUserToGroup(userToGroup: UserToGroup): Observable<UserToGroup> {
    return this.http.put<UserToGroup>(
      `${this.apiServerUrl}/update`,
      userToGroup
    );
  }
  public addUserToGroup(userToGroup: UserToGroup): Observable<UserToGroup> {
    return this.http.post<UserToGroup>(`${this.apiServerUrl}/add`, userToGroup);
  }
  public deleteStudentById(userToGroupId: Number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiServerUrl}/delete/${userToGroupId}`
    );
  }
  public deleteStudentByAccountId(accounId: Number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiServerUrl}/deleteByAccount/${accounId}`
    );
  }

  public changeStudentGroup(updateJson: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiServerUrl}/changeStudentGroup`,
      updateJson
    );
  }
}
