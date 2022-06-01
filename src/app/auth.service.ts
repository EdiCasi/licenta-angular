import { Injectable } from '@angular/core';
import { Account } from './account';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _router: Router) {}

  public getLoggedUser(): Account {
    var possibleUser: string | null = localStorage.getItem('user');

    if (possibleUser == null) {
      this._router.navigate(['login']);
    }
    return possibleUser == null ? null : JSON.parse(possibleUser);
  }
}
