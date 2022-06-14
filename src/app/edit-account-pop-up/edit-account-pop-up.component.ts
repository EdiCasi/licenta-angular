import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-account-pop-up',
  templateUrl: './edit-account-pop-up.component.html',
  styleUrls: ['./edit-account-pop-up.component.css'],
})
export class EditAccountPopUpComponent {
  public addUser = false;
  public passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  public emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public inputErrors: Boolean = false;

  public accountToModify: Account = new Account();

  constructor(
    public dialogRef: MatDialogRef<EditAccountPopUpComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public account: Account
  ) {
    if (this.accountIsInDatabase(account)) {
      Object.assign(this.accountToModify, this.account);
    } else if (account != undefined) {
      this.accountToModify.userType = account.userType;
      this.addUser = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    this.inputErrors = this.validateInput();
    if (!this.inputErrors) {
      if (this.accountIsInDatabase(this.account)) {
        this.modifyAccountInDatabase(this.accountToModify);
      } else {
        this.addAccountInDatabase(this.accountToModify);
      }
    }
  }

  private modifyAccountInDatabase(account: Account) {
    this.accountService.updateUser(account).subscribe(
      (response: Account) => {
        console.log('RESPONSE: ' + JSON.stringify(response));
        //CLOSE THE DIALOG WITH TE MODIFIED USER
        this.dialogRef.close(response);
        alert('Userul: ' + response.userName + ' a fost modificat cu succes!');
      },
      (error: HttpErrorResponse) => {
        console.log('==Error updating account: ' + JSON.stringify(error));
      }
    );
  }

  private addAccountInDatabase(account: Account) {
    this.accountService.addUser(account).subscribe(
      (response: Account) => {
        console.log('RESPONSE: ' + JSON.stringify(response));
        //CLOSE THE DIALOG WITH ThE ADDED USER
        alert('Userul: ' + response.userName + ' a fost adaugat cu succes!');

        this.dialogRef.close(response);
      },
      (error: HttpErrorResponse) => {
        console.log('==Error adding account: ' + JSON.stringify(error));
      }
    );
  }

  onPassInputChange($event: any): void {
    this.inputErrors = false;
    if ($event.target.value != '') {
      this.accountToModify.password = $event.target.value;
    } else if (this.account != undefined) {
      this.accountToModify.password = this.account.password;
    }
  }
  onInputChange($event: any): void {
    this.inputErrors = false;
  }

  validateInput(): Boolean {
    if (this.verifyIfFieldIsEmpty(this.accountToModify.email)) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (this.verifyIfFieldIsEmpty(this.accountToModify.userName)) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (this.verifyIfFieldIsEmpty(this.accountToModify.password)) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (
      !this.accountToModify.email.match(this.emailPattern) &&
      !this.accountIsInDatabase(this.account)
    ) {
      alert('Va rugam introduceti un email valid!');
      return true;
    }
    if (
      !this.accountToModify.password.match(this.passwordPattern) &&
      !this.accountIsInDatabase(this.account)
    ) {
      alert('Va rugam introduceti o parola valida!');
      return true;
    }
    return false;
  }

  private verifyIfFieldIsEmpty(field: string) {
    return (
      this.accountToModify.password == '' ||
      this.accountToModify.password == undefined
    );
  }

  private accountIsInDatabase(account: Account) {
    return account.id != 0 && account.id != undefined;
  }
}
