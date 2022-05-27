import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Account } from './account';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

 private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.apiServerUrl}/account/all`);
  }
}
