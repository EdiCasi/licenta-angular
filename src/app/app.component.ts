import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from './account';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public accounts: Account[] = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  public getAccounts(): void{
    this.accountService.getAccounts().subscribe(
      (response: Account[])=>{
        this.accounts = response;
      },
      (error: HttpErrorResponse)=>{
        console.log("error.message: " + error.message);
      }
    )
  }
}
