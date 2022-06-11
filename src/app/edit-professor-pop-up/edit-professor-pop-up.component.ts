import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Account } from '../account';

@Component({
  selector: 'app-edit-professor-pop-up',
  templateUrl: './edit-professor-pop-up.component.html',
  styleUrls: ['./edit-professor-pop-up.component.css'],
})
export class EditProfessorPopUpComponent {
  public passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
  public emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public inputErrors: Boolean = false;

  public proffesorToModify: Account = new Account();

  constructor(
    public dialogRef: MatDialogRef<EditProfessorPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public professor: Account
  ) {
    if (professor != undefined) {
      Object.assign(this.proffesorToModify, this.professor);
    } else {
      this.proffesorToModify.userType = 'professor';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick() {
    this.inputErrors = this.validateInput();
    if (!this.inputErrors) {
      this.dialogRef.close(this.proffesorToModify);
    }
  }

  onPassInputChange($event: any): void {
    this.inputErrors = false;
    if ($event.target.value != '') {
      this.proffesorToModify.password = $event.target.value;
    } else if (this.professor != undefined) {
      this.proffesorToModify.password = this.professor.password;
    }
  }
  onInputChange($event: any): void {
    this.inputErrors = false;
  }

  validateInput(): Boolean {
    if (
      this.proffesorToModify.email == '' ||
      this.proffesorToModify.email == undefined
    ) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (
      this.proffesorToModify.userName == '' ||
      this.proffesorToModify.userName == undefined
    ) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (
      this.proffesorToModify.password == '' ||
      this.proffesorToModify.password == undefined
    ) {
      alert('Va rugam sa completati toate campurile!');
      return true;
    }
    if (this.professor == undefined) {
      if (!this.proffesorToModify.email.match(this.emailPattern)) {
        alert('Va rugam introduceti un email valid!');
        return true;
      }
    }
    if (this.professor == undefined) {
      if (!this.proffesorToModify.password.match(this.passwordPattern)) {
        alert('Va rugam introduceti o parola valida!');
        return true;
      }
    }
    return false;
  }
}
