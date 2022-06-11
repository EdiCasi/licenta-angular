import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiServerUrl = environment.apiBaseUrl + '/account';

  constructor(private http: HttpClient) {}

  public getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/all`);
  }

  public loginUser(user: any): Observable<Account> {
    return this.http.post<Account>(`${this.apiServerUrl}/login`, user);
  }

  public getAllProfessors(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/getAllProfessors`);
  }
  public getAllStudents(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiServerUrl}/getAllStudents`);
  }
  public updateUser(user: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiServerUrl}/update`, user);
  }
  public addUser(user: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiServerUrl}/add`, user);
  }
  public deleteUser(userId: Number): Observable<any> {
    return this.http.delete<Account>(`${this.apiServerUrl}/delete/${userId}`);
  }
}
