import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}
  public logoutTheUser() {
    localStorage.removeItem('user');
    this._router.navigate(['login']);
  }
}
