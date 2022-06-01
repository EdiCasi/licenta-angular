import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public loggedUser: Account | null = null;

  constructor(private _router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // var possibleUser: string | null = localStorage.getItem('user');
    // if (possibleUser != null) {
    //   this.loggedUser = JSON.parse(possibleUser);
    //   console.log(this.loggedUser);
    // } else {
    //   this._router.navigate(['login']);
    // }
    this.loggedUser = this.auth.getLoggedUser();
  }
}
