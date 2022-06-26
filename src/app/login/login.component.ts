import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  public showLoading;
  public errorMessage;
  public passwordNotGood;
  public emailNotGood;
  public loginData = { email: '', password: '' };

  public forgotPassword: Boolean = false;

  constructor(private accountService: AccountService, private _router: Router) {
    this.showLoading = false;
    this.errorMessage = '';
    this.passwordNotGood = false;
    this.emailNotGood = false;
  }

  public loginUser() {
    if (this.verifyUserInput(this.loginData.email)) {
      return;
    }
    this.showLoading = true;
    this.accountService.loginUser(this.loginData).subscribe(
      (response: Account) => {
        this.showLoading = false;

        localStorage.setItem('user', JSON.stringify(response));

        this._router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
        this.onLoginError(error.error);
        console.log(' === ERRORR: ' + JSON.stringify(error));
      }
    );
  }

  onLoginError(errorMessage: string) {
    this.showLoading = false;
    this.errorMessage = errorMessage;

    if (this.errorMessage == 'The user was not found !') {
      this.emailNotGood = true;
    } else if (this.errorMessage == 'Incorrect password!') {
      this.passwordNotGood = true;
      this.emailNotGood = false;
    } else {
      this.passwordNotGood = false;
      this.emailNotGood = false;
    }
  }

  public verifyUserInput(loginData: any): Boolean {
    if (!this.isEmailAddress(this.loginData.email)) {
      this.emailNotGood = true;
      this.errorMessage = 'Please enter a valid email.';
      return true;
    }

    return false;
  }

  public isEmailAddress(email: string) {
    return email.match(this.emailPattern);
  }
  public isPassword(password: string) {
    return password.match(this.passwordPattern);
  }

  onForgorPassworClick() {
    this.forgotPassword = !this.forgotPassword;
  }
}
