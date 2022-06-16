import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  professorType: string = 'professor';
  studentType: string = 'student';
  adminType: string = 'admin';
  public loggedUser: Account | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loggedUser = this.auth.getLoggedUser();
  }
}
